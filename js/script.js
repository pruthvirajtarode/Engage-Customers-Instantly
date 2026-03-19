/**
 * Wati Landing Page
 * Main JavaScript Module
 * 
 * Features:
 * - Mobile menu toggle
 * - Smooth scrolling
 * - Tab switching
 * - Sticky navbar
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTabsystem();
    initStickyNavbar();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('navbar-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.style.opacity = menu.classList.contains('active') ? '0.7' : '1';
    });

    // Close menu when clicking links
    const links = menu.querySelectorAll('.navbar__link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
}

/**
 * Tab System
 */
function initTabsystem() {
    const buttons = document.querySelectorAll('.tabs__btn');
    const contents = document.querySelectorAll('.tabs__content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            buttons.forEach(btn => btn.classList.remove('tabs__btn--active'));
            contents.forEach(content => content.classList.remove('tabs__content--active'));

            // Add active class
            button.classList.add('tabs__btn--active');
            const activeContent = document.getElementById(tabName + '-tab');
            if (activeContent) {
                activeContent.classList.add('tabs__content--active');
            }
        });
    });
}

/**
 * Sticky Navbar Shadow
 */
function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('navbar--sticky');
        } else {
            navbar.classList.remove('navbar--sticky');
        }
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

/**
 * Scroll Animation for Elements
 */
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.tab__inner, .ai-card, .testimonial-card, .price-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}
