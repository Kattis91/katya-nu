class ScreenshotGallery {
    constructor(galleryElement) {
        this.gallery = galleryElement;
        this.screenshots = this.gallery.querySelectorAll('.screenshot');
        this.dots = this.gallery.querySelectorAll('.gallery-dot');
        this.prevBtn = this.gallery.querySelector('#prevBtn');
        this.nextBtn = this.gallery.querySelector('#nextBtn');
        this.currentSlide = 0;
        this.totalSlides = this.screenshots.length;
        
        this.init();
    }
    
    init() {
        this.updateCounter();
        this.bindEvents();
        this.startAutoplay();
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause autoplay on hover
        this.gallery.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.gallery.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        this.gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.gallery.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlides();
        this.updateDots();
        this.updateCounter();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlides();
        this.updateDots();
        this.updateCounter();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlides();
        this.updateDots();
        this.updateCounter();
    }
    
    updateSlides() {
        this.screenshots.forEach((screenshot, index) => {
            screenshot.classList.remove('active', 'prev', 'next');
            
            if (index === this.currentSlide) {
                screenshot.classList.add('active');
            } else {
                // Always slide from right to left for infinite carousel effect
                screenshot.classList.add('next');
            }
        });
    }
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    updateCounter() {
        const currentElement = this.gallery.querySelector('#current');
        const totalElement = this.gallery.querySelector('#total');
        
        if (currentElement) currentElement.textContent = this.currentSlide + 1;
        if (totalElement) totalElement.textContent = this.totalSlides;
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }
    
    pauseAutoplay() {
        clearInterval(this.autoplayInterval);
    }
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.screenshot-gallery');
    new ScreenshotGallery(gallery);
});