// Smooth scrolling navigation with enhanced effects
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            createBloodEffect();
        }
    });
});

// Review cards hover effects
const reviewCards = document.querySelectorAll('.review-card');
reviewCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        // Create glow effect
        this.style.boxShadow = '0 0 50px rgba(255, 0, 0, 0.8), inset 0 0 30px rgba(255, 0, 0, 0.2)';
        
        // Stagger animation for nearby cards
        reviewCards.forEach((otherCard, otherIndex) => {
            if (otherIndex !== index) {
                const distance = Math.abs(otherIndex - index);
                if (distance <= 2) {
                    otherCard.style.opacity = '0.7';
                }
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.2)';
        
        reviewCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// Create blood drip effect on scroll
function createBloodEffect() {
    const blood = document.createElement('div');
    blood.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 1001;
    `;
    
    blood.innerHTML = '🩸';
    blood.style.fontSize = '2rem';
    blood.style.opacity = '1';
    
    const randomX = Math.random() * window.innerWidth;
    blood.style.left = randomX + 'px';
    blood.style.top = '0px';
    
    document.body.appendChild(blood);
    
    let y = 0;
    const fall = setInterval(() => {
        y += 5;
        blood.style.top = y + 'px';
        blood.style.opacity = 1 - (y / window.innerHeight);
        
        if (y > window.innerHeight) {
            clearInterval(fall);
            blood.remove();
        }
    }, 30);
}

// Navbar scroll effect with blood glow
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 40px rgba(255, 0, 0, 0.8)';
    } else {
        navbar.style.boxShadow = '0 2px 30px rgba(255, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// Gallery image lightbox effect with blood animation
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach((item, index) => {
    item.style.animation = `slideIn ${0.3 + index * 0.1}s ease`;
    
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const src = img.src;
        
        // Create modal with blood theme
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        `;
        
        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 0 50px rgba(255, 0, 0, 0.8), inset 0 0 30px rgba(255, 0, 0, 0.3);
            border: 3px solid #ff0000;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerText = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            background: linear-gradient(135deg, #ff0000, #cc0000);
            color: #fff;
            border: 2px solid #ff0000;
            font-size: 40px;
            cursor: pointer;
            padding: 0;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
        `;
        
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.transform = 'scale(1.15) rotate(90deg)';
            closeBtn.style.boxShadow = '0 0 40px rgba(255, 0, 0, 1)';
        });
        
        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.transform = 'scale(1)';
        });
        
        modal.appendChild(imgElement);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        // Close modal on click
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === closeBtn) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.parentElement) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => modal.remove(), 300);
            }
        });
    });
});

// Animate elements on scroll with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item, .feature-category, .reason-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.5s ease ${index * 0.05}s`;
    observer.observe(el);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'h' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'f' to go to features
    if (e.key === 'f' || e.key === 'F') {
        document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'g' to go to gallery
    if (e.key === 'g' || e.key === 'G') {
        document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'c' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// Button click effects with blood splash
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        // Create blood drips from button
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createBloodEffect(), i * 50);
        }
        
        setTimeout(() => ripple.remove(), 600);
    });
    
    // Add hover glow effect
    btn.addEventListener('mouseover', function() {
        this.style.boxShadow = `0 0 30px rgba(255, 0, 0, 0.9), inset 0 0 20px rgba(255, 255, 255, 0.2)`;
    });
    
    btn.addEventListener('mouseout', function() {
        this.style.boxShadow = `0 0 20px rgba(255, 0, 0, 0.7), inset 0 0 10px rgba(0, 0, 0, 0.5)`;
    });
});

// Page load animation
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.animation = 'slideDown 0.8s ease';
    }
    
    console.log('%c SpyKing - ADVANCED ANDROID REMOTE TOOL', 
        'color: #ff0000; font-size: 20px; font-weight: bold; text-shadow: 0 0 20px #ff0000; background: #000; padding: 10px;');
    console.log('%c 🩸 WARNING: For Authorized Use Only 🩸', 
        'color: #ffff00; font-size: 16px; font-weight: bold;');
});

// Scroll to top button with blood effect
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '⬆ TOP';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #ff0000, #cc0000);
    color: #fff;
    border: 2px solid #ff0000;
    border-radius: 50%;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6);
    transition: all 0.3s ease;
    text-align: center;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    // Create blood drips
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createBloodEffect(), i * 30);
    }
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseover', () => {
    scrollTopBtn.style.transform = 'scale(1.15)';
    scrollTopBtn.style.boxShadow = '0 0 50px rgba(255, 0, 0, 1)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.transform = 'scale(1)';
    scrollTopBtn.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.6)';
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .gallery-item {
        cursor: pointer;
    }

    .gallery-item:active {
        transform: scale(0.95) !important;
    }

    /* Blood drip animation */
    @keyframes bleed {
        0% {
            opacity: 1;
            transform: translateY(0) translateX(0);
        }
        100% {
            opacity: 0;
            transform: translateY(100px) translateX(30px);
        }
    }

    /* Pulse effect for titles */
    @keyframes titlePulse {
        0%, 100% {
            text-shadow: 0 0 20px #ff0000, 0 0 40px #cc0000;
        }
        50% {
            text-shadow: 0 0 30px #ff0000, 0 0 50px #ff0000;
        }
    }

    /* Flicker effect */
    @keyframes flicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
        }
        20%, 24%, 55% {
            opacity: 0.3;
        }
    }
`;

document.head.appendChild(style);

// Mouse trail effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Prevent accident leaks - security reminder
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Easter egg - konami code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateBloodMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateBloodMode() {
    // Create intense blood effect
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createBloodEffect(), i * 30);
    }
    
    // Flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ff0000;
        z-index: 9999;
        opacity: 0.3;
        animation: flashPulse 0.5s ease;
        pointer-events: none;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
}

// Add flashPulse animation
const flashStyle = document.createElement('style');
flashStyle.textContent = `
    @keyframes flashPulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.7; }
    }
`;
document.head.appendChild(flashStyle);

/* Page loader: track image loads and window load, update progress bar, then reveal content */
(function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    function setProgress(percent) {
        if (progressFill) progressFill.style.width = percent + '%';
        if (progressText) progressText.textContent = percent + '%';
    }

    const imgs = Array.from(document.images);
    let loaded = 0;
    const total = Math.max(1, imgs.length) + 1; // include final window load as one

    function incLoaded() {
        loaded++;
        const percent = Math.min(100, Math.round((loaded / total) * 100));
        setProgress(percent);
        if (percent >= 100) {
            // reveal content and remove loader with fade
            if (loadingScreen) loadingScreen.classList.add('hidden');
            document.body.classList.add('loaded');
            setTimeout(() => {
                if (loadingScreen && loadingScreen.parentNode) loadingScreen.parentNode.removeChild(loadingScreen);
            }, 700);
        }
    }

    if (imgs.length === 0) {
        // no images: wait for window load
        window.addEventListener('load', () => {
            loaded = total;
            setProgress(100);
            incLoaded();
        });
    } else {
        imgs.forEach(img => {
            if (img.complete) {
                incLoaded();
            } else {
                img.addEventListener('load', incLoaded);
                img.addEventListener('error', incLoaded);
            }
        });

        window.addEventListener('load', () => {
            // ensure complete
            loaded = total - 1; // mark images as done, then incLoaded will finish
            incLoaded();
        });
    }

    // Safety timeout in case some resources hang (10s)
    setTimeout(() => {
        setProgress(100);
        if (loadingScreen) loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) loadingScreen.parentNode.removeChild(loadingScreen);
        }, 700);
    }, 10000);

})();
