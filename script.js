/**
 * SpyKing - script.js
 * Interactivity and Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Logic
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const body = document.body;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Artificial delay for smooth transition
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.6s ease';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    body.classList.remove('loading');
                    // Trigger initial reveal
                    reveal();
                }, 600);
            }, 500);
        }
        progressFill.style.width = `${progress}%`;
        progressText.innerText = `${Math.floor(progress)}%`;
    }, 150);

    // 2. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Disable scroll when menu is open
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const reveal = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);

    // 4. Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.height = '70px';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.height = '80px';
        }
    });

    // 5. Active Link Highlighting
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // 6. Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Blood Bath Animation
    const bloodContainer = document.getElementById('bloodContainer');
    if (bloodContainer) {
        function createBloodDrip() {
            const drip = document.createElement('div');
            drip.classList.add('blood-drop');
            
            // Randomize position and animation properties
            const startX = Math.random() * 100; // Left percentage
            const duration = 5 + Math.random() * 10; // 5-15 seconds
            const delay = Math.random() * 5;
            const size = 1 + Math.random() * 3; // width in px

            drip.style.left = `${startX}%`;
            drip.style.width = `${size}px`;
            drip.style.animation = `drop ${duration}s linear ${delay}s infinite`;
            
            bloodContainer.appendChild(drip);

            // Optional: Create splashes when drips "hit" the bottom area
            // Since it's a background overflow hidden, we just let them drip out
        }

        // Initial drips
        for (let i = 0; i < 30; i++) {
            createBloodDrip();
        }
        
        // Add more drips periodically
        setInterval(() => {
            if (bloodContainer.children.length < 50) {
                createBloodDrip();
            }
        }, 1000);
    }
});
