document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. SISTEMA DE TEMA (DARK/LIGHT MODE COM MEMÓRIA)
       ========================================= */
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Função auxiliar para atualizar o ícone
    const updateThemeIcon = (isLight) => {
        if (!themeBtn) return;
        const icon = themeBtn.querySelector('i');
        if (isLight) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };

    // 1. Verifica se já existe uma preferência salva no navegador
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        updateThemeIcon(true);
    }

    // 2. Event Listener para o clique no botão
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            // Alterna a classe no body
            body.classList.toggle('light-theme');
            
            // Verifica se ficou claro ou escuro
            const isLight = body.classList.contains('light-theme');
            
            // Atualiza o ícone
            updateThemeIcon(isLight);
            
            // Salva a escolha na memória do navegador
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    /* =========================================
       2. INICIALIZAÇÃO DO PARTICLES.JS (EFEITO NOIRET)
       ========================================= */
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#a0aab5" }, /* Prata */
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": false }
                },
                "line_linked": { "enable": false }, /* Sem linhas */
                "move": {
                    "enable": true,
                    "speed": 0.6,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "bubble" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "bubble": { "distance": 200, "size": 4, "duration": 2, "opacity": 0.6, "speed": 3 },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    /* =========================================
       3. SCROLL ANIMATION (REVEAL)
       ========================================= */
    // Injeta estilos de animação
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
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
        rootMargin: "0px 0px -30px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       4. NAVBAR SCROLL EFFECT
       ========================================= */
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                // Ao rolar: padding menor e sombra sutil
                navbar.style.padding = '15px 0';
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'; 
            } else {
                // No topo: padding original e sem sombra
                navbar.style.padding = '20px 0';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    /* =========================================
       5. MOBILE MENU TOGGLE
       ========================================= */
    const mobileBtn = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isClosed = navLinks.style.display === 'none' || navLinks.style.display === '';
            
            if (isClosed) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                
                // Adapta a cor do menu mobile ao tema atual
                const isLight = document.body.classList.contains('light-theme');
                navLinks.style.background = isLight ? '#ffffff' : '#0f1218';
                
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '999';
            } else {
                navLinks.style.display = 'none';
            }
        });

        // Fecha menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }

    /* =========================================
       6. FORM SUBMISSION (SIMULAÇÃO)
       ========================================= */
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerText = 'Mensagem Enviada';
                btn.style.background = '#8da9c4'; // Azul Aço
                btn.style.color = '#050608';
                
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});