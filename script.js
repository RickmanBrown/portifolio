document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeBtn = document.getElementById("theme-toggle");
  const navbar = document.querySelector(".navbar");
  const mobileBtn = document.querySelector(".mobile-menu-icon");
  const navLinks = document.querySelector(".nav-links");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  /* =========================================
     1. HELPERS
     ========================================= */
  const isMobile = () => window.innerWidth <= 768;

  const setStatus = (message, type = "default") => {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = "";

    const colors = {
      default: "var(--text-muted)",
      success: "#46c37b",
      error: "#ff6b6b",
      loading: "var(--text-soft)",
    };

    formStatus.style.color = colors[type] || colors.default;
  };

  /* =========================================
     2. THEME
     ========================================= */
  const updateThemeIcon = (isLight) => {
    if (!themeBtn) return;

    const icon = themeBtn.querySelector("i");
    if (!icon) return;

    icon.classList.toggle("fa-sun", isLight);
    icon.classList.toggle("fa-moon", !isLight);
  };

  const applySavedTheme = () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      body.classList.add("light-theme");
      updateThemeIcon(true);
    } else {
      body.classList.remove("light-theme");
      updateThemeIcon(false);
    }
  };

  applySavedTheme();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("light-theme");

      const isLight = body.classList.contains("light-theme");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      updateThemeIcon(isLight);

      if (typeof window.pJSDom !== "undefined" && window.pJSDom.length > 0) {
        const particleColor = isLight ? "#557ea5" : "#a0b8d2";
        const particleInstance = window.pJSDom[0]?.pJS;

        if (particleInstance) {
          particleInstance.particles.color.value = particleColor;
          particleInstance.particles.array.forEach((particle) => {
            particle.color.value = particleColor;
          });
        }
      }
    });
  }

  /* =========================================
     3. PARTICLES
     ========================================= */
  const initParticles = () => {
    const particlesContainer = document.getElementById("particles-js");
    if (!particlesContainer || typeof particlesJS === "undefined") return;

    const isLight = body.classList.contains("light-theme");

    particlesJS("particles-js", {
      particles: {
        number: {
          value: 42,
          density: {
            enable: true,
            value_area: 900,
          },
        },
        color: {
          value: isLight ? "#557ea5" : "#a0b8d2",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.22,
          random: true,
          anim: {
            enable: true,
            speed: 0.4,
            opacity_min: 0.08,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
          },
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 0.55,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "bubble",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 140,
            size: 4,
            duration: 2,
            opacity: 0.45,
            speed: 3,
          },
          push: {
            particles_nb: 3,
          },
        },
      },
      retina_detect: true,
    });
  };

  initParticles();

  /* =========================================
     4. NAVBAR SCROLL
     ========================================= */
  const updateNavbarOnScroll = () => {
    if (!navbar) return;

    if (window.scrollY > 30) {
      navbar.style.padding = "12px 0";
      navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.16)";
    } else {
      navbar.style.padding = "";
      navbar.style.boxShadow = "";
    }
  };

  updateNavbarOnScroll();
  window.addEventListener("scroll", updateNavbarOnScroll);

  /* =========================================
     5. MOBILE MENU
     ========================================= */
  const injectMobileMenuStyles = () => {
    if (document.getElementById("mobile-menu-dynamic-styles")) return;

    const style = document.createElement("style");
    style.id = "mobile-menu-dynamic-styles";
    style.textContent = `
      @media (max-width: 768px) {
        .nav-links.mobile-open {
          display: flex !important;
          flex-direction: column;
          position: absolute;
          top: calc(100% + 12px);
          left: 0;
          width: min(100%, 320px);
          padding: 18px;
          gap: 16px;
          border-radius: 22px;
          border: 1px solid var(--border-glass);
          background: var(--bg-panel);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
          align-items: flex-start;
        }

        .nav-links.mobile-open .nav-link,
        .nav-links.mobile-open .btn-contact {
          width: 100%;
        }

        .nav-links.mobile-open .btn-contact {
          justify-content: center;
          text-align: center;
        }

        .mobile-menu-icon.is-active {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          box-shadow: 0 0 20px rgba(141, 184, 223, 0.18);
        }
      }
    `;
    document.head.appendChild(style);
  };

  injectMobileMenuStyles();

  const openMobileMenu = () => {
    if (!navLinks || !mobileBtn) return;
    navLinks.classList.add("mobile-open");
    mobileBtn.classList.add("is-active");
    mobileBtn.setAttribute("aria-expanded", "true");
  };

  const closeMobileMenu = () => {
    if (!navLinks || !mobileBtn) return;
    navLinks.classList.remove("mobile-open");
    mobileBtn.classList.remove("is-active");
    mobileBtn.setAttribute("aria-expanded", "false");
  };

  const toggleMobileMenu = () => {
    if (!navLinks) return;

    if (navLinks.classList.contains("mobile-open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  if (mobileBtn && navLinks) {
    mobileBtn.setAttribute("aria-expanded", "false");

    mobileBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleMobileMenu();
    });

    document.querySelectorAll(".nav-link, .btn-contact").forEach((link) => {
      link.addEventListener("click", () => {
        if (isMobile()) closeMobileMenu();
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedButton = mobileBtn.contains(event.target);

      if (isMobile() && navLinks.classList.contains("mobile-open") && !clickedInsideMenu && !clickedButton) {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (!isMobile()) closeMobileMenu();
    });
  }

  /* =========================================
     6. SMOOTH SCROLL
     ========================================= */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetTop =
        targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 12;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    });
  });

  /* =========================================
     7. REVEAL ON SCROLL
     ========================================= */
  const revealStyleId = "reveal-animation-styles";

  if (!document.getElementById(revealStyleId)) {
    const styleSheet = document.createElement("style");
    styleSheet.id = revealStyleId;
    styleSheet.textContent = `
      .reveal {
        opacity: 0;
        transform: translateY(28px);
        transition:
          opacity 0.75s ease,
          transform 0.75s ease;
        will-change: opacity, transform;
      }

      .reveal.active {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(styleSheet);
  }

  const revealElements = document.querySelectorAll(`
    .section-header,
    .hero-subtitle,
    .hero-title,
    .hero-role,
    .hero-description,
    .hero-buttons,
    .hero-highlights,
    .about-text,
    .about-card,
    .skill-card,
    .project-card,
    .contact-info,
    .contact-form,
    .footer-content
  `);

  revealElements.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(index * 0.04, 0.28)}s`;
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, revealObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("active"));
  }

  /* =========================================
     8. ACTIVE LINK ON SCROLL
     ========================================= */
  const navAnchorLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = [...navAnchorLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + (navbar?.offsetHeight || 0) + 30;

    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = `#${section.id}`;
      }
    });

    navAnchorLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === currentSectionId;
      link.style.color = isActive ? "var(--text-main)" : "";
      link.style.opacity = isActive ? "1" : "";
    });
  };

  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink);

  /* =========================================
     9. CONTACT FORM
     ========================================= */
  if (contactForm && submitBtn && formStatus) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      if (!name || !email || !message) {
        setStatus("Preencha todos os campos antes de enviar.", "error");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
      submitBtn.textContent = "Enviando...";
      setStatus("Enviando sua mensagem...", "loading");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        });

        const contentType = response.headers.get("content-type") || "";
        const result = contentType.includes("application/json")
          ? await response.json()
          : null;

        if (response.ok) {
          setStatus("Mensagem enviada com sucesso! ✨", "success");
          contactForm.reset();
        } else {
          setStatus(result?.error || "Não foi possível enviar. Tente novamente.", "error");
        }
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        setStatus("Erro ao conectar com o servidor. Verifique o endpoint do formulário.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.innerHTML = "Enviar Mensagem";
      }
    });
  }
});