function showContactForm() {
    const form = document.getElementById('contactForm');
    const contactMethods = document.querySelector('.contact-methods');

    // Hide the contact methods container
    contactMethods.style.display = 'none';
    
    // Show the form
    form.classList.add('active');
    
    // Smooth scroll to form
    setTimeout(() => {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function hideContactForm() {
    const form = document.getElementById('contactForm');
    const contactMethods = document.querySelector('.contact-methods');
    
    // Hide the form
    form.classList.remove('active');
    
    // Show the contact methods container again
    contactMethods.style.display = 'block';
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    fetch('https://formspree.io/f/manjrgyb', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your message! I\'ll get back to you soon.');
            form.reset();
            hideContactForm();
        } else {
            alert('Oops! There was a problem sending your message.');
        }
    })
    .catch(error => {
        alert('Oops! There was a problem sending your message.');
        console.error('Form submission error:', error);
    });
}

// Initialize contact form
function initContactForm() {
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', handleFormSubmission);
    }
}