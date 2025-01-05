document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = navToggle.querySelector('.hamburger');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Toggle menu when clicking hamburger
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu when clicking a nav link
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            closeMenu();
        }
    });

    // Close menu when window is resized beyond mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});