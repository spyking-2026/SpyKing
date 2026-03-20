// ============================================================
// SPYKING - Advanced Android Remote Control Tool
// Clean, Optimized JavaScript
// ============================================================

// 1. LOADING OVERLAY MANAGEMENT
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const mainContent = document.getElementById('mainContent');
    
    setTimeout(() => {
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.pointerEvents = 'none';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
        if (mainContent) {
            mainContent.classList.add('visible');
        }
    }, 1500);
});

// 2. IMAGE OPTIMIZATION
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// Handle image loading errors
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23cc2222" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="14" fill="white" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
    });
});

// 3. MOBILE OPTIMIZATION
const isMobile = window.matchMedia('(max-width: 768px)').matches;
if (isMobile) {
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.5s !important;
            transition-duration: 0.2s !important;
        }
    `;
    document.head.appendChild(style);
}

// 4. BLOOD EFFECT UTILITY
function createBloodEffect() {
    const blood = document.createElement('div');
    blood.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 1001;
        font-size: 2rem;
        opacity: 1;
        left: ${Math.random() * 100}%;
        top: 0;
    `;
    blood.textContent = '🩸';
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

// 5. SMOOTH SCROLLING NAVIGATION
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            createBloodEffect();
        }
    });
});

// 6. GALLERY LIGHTBOX
function openGallery(img) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
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
    imgElement.src = img.src;
    imgElement.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 0 50px rgba(204, 34, 34, 0.8);
        border: 3px solid #cc2222;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: #cc2222;
        color: #fff;
        border: none;
        font-size: 40px;
        cursor: pointer;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        transition: all 0.3s ease;
        z-index: 2001;
    `;
    
    closeBtn.addEventListener('click', () => lightbox.remove());
    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.transform = 'scale(1.2)';
    });
    
    lightbox.appendChild(imgElement);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.remove();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.parentElement) lightbox.remove();
    }, { once: true });
    
    createBloodEffect();
}

// 7. GALLERY SETUP
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) openGallery(img);
    });
});

// 8. REVIEW CARD HOVER EFFECTS
document.querySelectorAll('.review-card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 0 30px rgba(204, 34, 34, 0.6)';
        
        document.querySelectorAll('.review-card').forEach((c, i) => {
            if (i !== index) {
                c.style.opacity = '0.5';
                c.style.filter = 'grayscale(60%)';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        document.querySelectorAll('.review-card').forEach(c => {
            c.style.opacity = '1';
            c.style.filter = 'grayscale(0%)';
            c.style.transform = 'translateY(0)';
            c.style.boxShadow = '';
        });
    });
});

// 9. KEYBOARD SHORTCUTS
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) return;
    
    const shortcuts = {
        'h': '#home',
        'f': '#features',
        'g': '#gallery',
        'c': '#contact'
    };
    
    if (shortcuts[e.key.toLowerCase()]) {
        const target = document.querySelector(shortcuts[e.key.toLowerCase()]);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            createBloodEffect();
        }
    }
});

// 10. EASTER EGG - KONAMI CODE
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiPattern[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiPattern.length) {
            activateBloodMode();
            konamiIndex = 0;
        }
    } else if (e.key !== konamiPattern[0]) {
        konamiIndex = 0;
    }
});

function activateBloodMode() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            filter: saturate(1.5) brightness(0.85) !important;
        }
        body {
            background: linear-gradient(135deg, #3d0000 0%, #1a0000 100%) !important;
        }
    `;
    document.head.appendChild(style);
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createBloodEffect(), i * 100);
    }
}

// 11. SCROLL TO TOP BUTTON
const scrollBtn = document.createElement('button');
scrollBtn.id = 'scrollToTop';
scrollBtn.innerHTML = '↑';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #cc2222, #880000);
    color: #fff;
    border: 2px solid #cc2222;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    box-shadow: 0 0 30px rgba(204, 34, 34, 0.6);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollBtn);

scrollBtn.addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createBloodEffect(), i * 30);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollBtn.addEventListener('mouseover', () => {
    scrollBtn.style.transform = 'scale(1.15)';
    scrollBtn.style.boxShadow = '0 0 50px rgba(204, 34, 34, 1)';
});

scrollBtn.addEventListener('mouseout', () => {
    scrollBtn.style.transform = 'scale(1)';
});

window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

// 12. BUTTON EFFECTS
document.querySelectorAll('.btn, .buy-btn, .contact-btn, .cta-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        createBloodEffect();
        window.open('https://t.me/spykingrat', '_blank');
    });
    
    btn.addEventListener('mouseover', function() {
        this.style.boxShadow = '0 0 30px rgba(204, 34, 34, 0.9)';
    });
    
    btn.addEventListener('mouseout', function() {
        this.style.boxShadow = '0 0 20px rgba(204, 34, 34, 0.7)';
    });
});

// 13. NAVBAR SCROLL EFFECT
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.style.boxShadow = window.scrollY > 100
            ? '0 5px 40px rgba(204, 34, 34, 0.8)'
            : '0 2px 30px rgba(204, 34, 34, 0.4)';
    }
});

// 14. SCROLL ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item, .feature-category, .review-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.5s ease ${index * 0.05}s`;
    observer.observe(el);
});

// 15. CONSOLE MESSAGE
console.log('%c SpyKing - ADVANCED ANDROID REMOTE TOOL', 
    'color: #cc2222; font-size: 20px; font-weight: bold; background: #000; padding: 10px;');
console.log('%c 🩸 For Authorized Use Only 🩸', 
    'color: #ffff00; font-size: 16px; font-weight: bold;');

// 16. ADD CRITICAL ANIMATIONS TO DOCUMENT
const animations = document.createElement('style');
animations.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .gallery-item { cursor: pointer; }
    .gallery-item:active { transform: scale(0.95) !important; }
`;
document.head.appendChild(animations);
