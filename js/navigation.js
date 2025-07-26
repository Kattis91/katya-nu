function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
}

function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({
        behavior: 'smooth'
    });
}

// Event listeners for navigation
function initNavigation() {
    // Close mobile menu when clicking overlay
    document.getElementById('navOverlay').addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navLinks = document.getElementById('navLinks');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        }
    });

    // Force page to load at top
    window.addEventListener('load', function() {
        if (window.location.hash) {
            history.replaceState(null, null, window.location.pathname);
        }
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });
}