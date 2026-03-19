/**
 * StreamFlow Landing Page
 * Main JavaScript Module
 * 
 * Features:
 * - Mobile menu toggle
 * - Smooth scrolling
 * - Sticky navbar shadow
 * - Scroll animations (fade-in)
 * - Intersection Observer for performance
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initStickyNavbar();
    initScrollAnimations();
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenu = document.getElementById('navbar-menu');

    if (!menuToggle || !navbarMenu) return;

    // Toggle menu on button click
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
            menuToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
        );
    });

    // Close menu when a link is clicked
    const navLinks = navbarMenu.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar__container')) {
            menuToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// STICKY NAVBAR
// ============================================

/**
 * Initialize sticky navbar shadow effect
 */
function initStickyNavbar() {
    const navbar = document.querySelector('.navbar--sticky');
    
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 10) {
            navbar.classList.add('navbar--shadow');
        } else {
            navbar.classList.remove('navbar--shadow');
        }
    };

    // Use throttled scroll listener for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ============================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ============================================

/**
 * Initialize scroll-triggered animations using Intersection Observer API
 */
function initScrollAnimations() {
    // Elements to animate on scroll
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card--fade-in, .step--fade-in, .testimonial--fade-in, .pricing-card--fade-in'
    );

    if (elementsToAnimate.length === 0) return;

    // Create Intersection Observer with options
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger animation by setting animation delay based on index
                const cards = document.querySelectorAll(
                    '.feature-card--fade-in, .step--fade-in, .testimonial--fade-in, .pricing-card--fade-in'
                );
                const index = Array.from(cards).indexOf(entry.target);
                const delay = index * 0.1; // 100ms delay between each element

                entry.target.style.animationDelay = `${delay}s`;
                entry.target.style.opacity = '1';

                // Stop observing once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// DEMO VIDEO (OPTIONAL)
// ============================================

/**
 * Demo video button functionality
 */
document.addEventListener('DOMContentLoaded', () => {
    const demoVideoBtn = document.getElementById('demo-video');
    
    if (demoVideoBtn) {
        demoVideoBtn.addEventListener('click', () => {
            showDemoModal();
        });
    }
});

/**
 * Display demo video modal
 */
function showDemoModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="Close video">×</button>
            <div class="video-container">
                <iframe 
                    width="100%" 
                    height="600" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Add modal styles
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease-in-out;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            .modal-content {
                position: relative;
                width: 90%;
                max-width: 900px;
                background-color: #000;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            }

            .modal-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                font-size: 32px;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transition: background-color 0.2s;
                z-index: 1001;
            }

            .modal-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .video-container {
                aspect-ratio: 16 / 9;
                width: 100%;
            }

            .video-container iframe {
                width: 100%;
                height: 100%;
            }

            @media (max-width: 767px) {
                .modal-content {
                    width: 95%;
                    max-width: none;
                }

                .video-container {
                    aspect-ratio: 16 / 9;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// FORM HANDLING (OPTIONAL)
// ============================================

/**
 * Handle form submissions (for Get Started / Contact forms)
 */
document.addEventListener('DOMContentLoaded', () => {
    // This is a placeholder for form handling
    // In production, you would connect to your backend API
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted');
            // Add your form handling logic here
        });
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for optimizing event handlers
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for optimizing scroll/resize handlers
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// ============================================
// LAZY LOADING (OPTIONAL)
// ============================================

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserverOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, imageObserverOptions);

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading on page load
document.addEventListener('DOMContentLoaded', initLazyLoading);

// ============================================
// ANALYTICS (PLACEHOLDER)
// ============================================

/**
 * Track user interactions (placeholder)
 */
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // In production, send to analytics service (Google Analytics, Mixpanel, etc.)
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.closest('.button')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('button_clicked', { button: buttonText });
    }
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

/**
 * Log Web Vitals if available
 */
if ('web-vital' in window) {
    import('https://web-vitals.dev/base.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(cls => console.log('CLS:', cls));
        getFID(fid => console.log('FID:', fid));
        getFCP(fcp => console.log('FCP:', fcp));
        getLCP(lcp => console.log('LCP:', lcp));
        getTTFB(ttfb => console.log('TTFB:', ttfb));
    });
}

// ============================================
// EXPORT (for modular usage)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initSmoothScroll,
        initStickyNavbar,
        initScrollAnimations,
        debounce,
        throttle,
        isInViewport
    };
}
