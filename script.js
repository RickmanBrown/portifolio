document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. SISTEMA DE TEMA (DARK/LIGHT MODE)
       ========================================= */
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const updateThemeIcon = (isLight) => {
        if (!themeBtn) return;

        const icon = themeBtn.querySelector('i');
        if (!icon) return;

        if (isLight) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');

            const isLight = body.classList.contains('light-theme');
            updateThemeIcon(isLight);

            localStorage.setItem('theme', isLight ? 'light' : 'dark');

            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('mobile-open')) {
                navLinks.style.background = isLight ? '#ffffff' : '#0f1218';
            }
        });
    }

    /* =========================================
       2. INICIALIZAÇÃO DO PARTICLES.JS
       ========================================= */
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: { enable: true, value_area: 800 }
                },
                color: { value: "#a0aab5" },
                shape: { type: "circle" },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: false }
                },
                line_linked: { enable: false },
                move: {
                    enable: true,
                    speed: 0.6,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "bubble" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 200,
                        size: 4,
                        duration: 2,
                        opacity: 0.6,
                        speed: 3
                    },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    /* =========================================
       3. SCROLL ANIMATION (REVEAL)
       ========================================= */
    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);

    const revealElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .about-content-text-only p, .stat-item, .skill-card, .project-card, .contact-info, .contact-form'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.10,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    /* =========================================
       4. NAVBAR SCROLL EFFECT
       ========================================= */
    const navbar = document.querySelector('.navbar');

    const updateNavbarOnScroll = () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    };

    if (navbar) {
        updateNavbarOnScroll();
        window.addEventListener('scroll', updateNavbarOnScroll);
    }

    /* =========================================
       5. MOBILE MENU TOGGLE
       ========================================= */
    const mobileBtn = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    const openMobileMenu = () => {
        if (!navLinks) return;

        const isLight = document.body.classList.contains('light-theme');

        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = isLight ? '#ffffff' : '#0f1218';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.12)';
        navLinks.style.zIndex = '999';
        navLinks.classList.add('mobile-open');
    };

    const closeMobileMenu = () => {
        if (!navLinks) return;

        navLinks.style.display = '';
        navLinks.style.flexDirection = '';
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.width = '';
        navLinks.style.background = '';
        navLinks.style.padding = '';
        navLinks.style.boxShadow = '';
        navLinks.style.zIndex = '';
        navLinks.classList.remove('mobile-open');
    };

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('mobile-open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        document.querySelectorAll('.nav-link, .btn-contact').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });

        document.addEventListener('click', (e) => {
            const clickedInsideMenu = navLinks.contains(e.target);
            const clickedButton = mobileBtn.contains(e.target);

            if (
                window.innerWidth <= 768 &&
                navLinks.classList.contains('mobile-open') &&
                !clickedInsideMenu &&
                !clickedButton
            ) {
                closeMobileMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }

    /* =========================================
       6. SCROLL SUAVE NOS LINKS INTERNOS
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();

            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition =
                targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    /* =========================================
       7. FORMULÁRIO DE CONTATO
       ========================================= */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && submitBtn && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            formStatus.innerText = 'Enviando mensagem...';
            formStatus.style.color = '#e0e6ed';

            const data = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                message: document.getElementById('message')?.value || ''
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    formStatus.innerText = 'Mensagem enviada com sucesso! ✨';
                    formStatus.style.color = '#4CAF50';
                    contactForm.reset();
                } else {
                    formStatus.innerText = 'Erro: ' + (result.error || 'Tente novamente.');
                    formStatus.style.color = '#FF5252';
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                formStatus.innerText = 'Erro ao conectar com o servidor. Verifique sua conexão.';
                formStatus.style.color = '#FF5252';
            } finally {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        });
    }
});