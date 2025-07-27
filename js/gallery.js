class ScreenshotGallery {
    constructor(galleryElement) {
        this.gallery = galleryElement;
        this.screenshots = this.gallery.querySelectorAll('.screenshot');
        this.dots = this.gallery.querySelectorAll('.gallery-dot');
        this.prevBtn = this.gallery.querySelector('#prevBtn');
        this.nextBtn = this.gallery.querySelector('#nextBtn');
        this.currentSlide = 0;
        this.totalSlides = this.screenshots.length;
        this.isTransitioning = false;
        this.init();
    }
    
    init() {
        // CRITICAL: Detect screenshot type FIRST before other operations
        this.detectScreenshotType();
        this.updateCounter();
        this.bindEvents();
        this.startAutoplay();
    }
    
    detectScreenshotType() {
        if (this.screenshots.length > 0) {
            const firstImg = this.screenshots[0];
            
            const checkAspectRatio = () => {
                if (firstImg.naturalWidth && firstImg.naturalHeight) {
                    const aspectRatio = firstImg.naturalWidth / firstImg.naturalHeight;
                    console.log('Screenshot dimensions:', firstImg.naturalWidth, 'x', firstImg.naturalHeight);
                    console.log('Screenshot aspect ratio:', aspectRatio);
                    
                    // Your screenshot appears to be very tall and narrow
                    // Let's check for height > 2000px OR aspect ratio < 0.5
                    if (firstImg.naturalHeight > 2000 || aspectRatio < 0.5) {
                        this.gallery.classList.add('android');
                        console.log('Added android class for tall screenshot');
                    } else if (aspectRatio > 0.48) {
                        this.gallery.classList.add('android');
                        console.log('Added android class for wider aspect ratio');
                    } else {
                        console.log('Using iPhone sizing');
                    }
                }
            };

            if (firstImg.complete) {
                checkAspectRatio();
            } else {
                firstImg.addEventListener('load', checkAspectRatio);
            }
        }
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

// Initialize ALL galleries when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.screenshot-gallery');
    galleries.forEach(gallery => {
        new ScreenshotGallery(gallery);
    });
});