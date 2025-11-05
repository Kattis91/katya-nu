function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const navRight = document.querySelector('.nav-right');
    const navOverlay = document.getElementById('navOverlay');

    navLinks.classList.toggle('active');
    navRight.classList.toggle('active')
    navOverlay.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const navRight = document.querySelector('.nav-right');
    const navOverlay = document.getElementById('navOverlay');

    navLinks.classList.remove('active');
    navRight.classList.remove('active');
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
        const navRight = document.getElementById('.nav-right');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navRight && !navRight.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            navRight.classList.remove('active');
            document.getElementById('navLinks').classList.remove('active');
            navOverlay.classList.remove('active');
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const navLinks = document.getElementById('navLinks');
            const navRight = document.querySelector('.nav-right');
            const navOverlay = document.getElementById('navOverlay');
            
            navLinks.classList.remove('active');
            navRight.classList.remove('active');
            navOverlay.classList.remove('active');
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