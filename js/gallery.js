class ScreenshotGallery {
    constructor(galleryElement) {
        this.gallery = galleryElement;
        this.screenshots = this.gallery.querySelectorAll('.screenshot');
        this.dots = this.gallery.querySelectorAll('.gallery-dot');
        this.prevBtn = this.gallery.querySelector('#prevBtn, .gallery-arrow:first-child');
        this.nextBtn = this.gallery.querySelector('#nextBtn, .gallery-arrow:last-child');
        this.screen = this.gallery.querySelector('.screen');
        this.currentSlide = 0;
        this.totalSlides = this.screenshots.length;
        this.isTransitioning = false;
        
        // Enhanced animation settings for dramatic effects
        this.animationModes = {
            HOLOGRAPHIC: 'holo',      // Enhanced holographic with flying effects
            MATRIX: 'matrix',         // Digital disintegration effect  
            QUANTUM: 'quantum'        // Spinning tunnel effect
        };
        
        // Set to HOLOGRAPHIC for the dramatic flying effect you want
        this.currentMode = this.animationModes.HOLOGRAPHIC;
        this.animationDuration = {
            holo: 1800,  // Longer for more dramatic effect
            matrix: 1400,
            quantum: 1000
        };
        
        // Performance optimization settings
        this.transitionQueue = [];
        this.isPreloading = false;
        
        this.init();
    }
    
    init() {
        this.optimizeForPerformance();
        this.detectScreenshotType();
        this.preloadImages();
        this.updateCounter();
        this.bindEvents();
        this.startAutoplay();
        
        // Set initial state and animation mode
        if (this.screenshots.length > 0) {
            this.screenshots[0].classList.add('active');
        }
        
        // Add mode class to gallery for styling
        this.gallery.classList.add(`${this.currentMode}-mode`);
        
        console.log(`✨ Gallery initialized with ${this.currentMode.toUpperCase()} dramatic flying animations`);
    }
    
    optimizeForPerformance() {
        // Force GPU acceleration on all screenshots
        this.screenshots.forEach(screenshot => {
            screenshot.style.willChange = 'transform, opacity, filter';
            screenshot.style.transformStyle = 'preserve-3d';
            screenshot.style.backfaceVisibility = 'hidden';
        });
        
        // Add performance-optimized class to gallery
        this.gallery.classList.add('gpu-optimized');
        
        console.log('🚀 GPU acceleration enabled for smooth animations');
    }
    
    preloadImages() {
        // Preload all images for instant transitions
        this.screenshots.forEach((screenshot, index) => {
            if (!screenshot.complete) {
                screenshot.addEventListener('load', () => {
                    console.log(`📸 Screenshot ${index + 1} loaded and ready`);
                });
            }
        });
    }
    
    detectScreenshotType() {
        if (this.screenshots.length > 0) {
            const firstImg = this.screenshots[0];
            
            const checkAspectRatio = () => {
                if (firstImg.naturalWidth && firstImg.naturalHeight) {
                    const aspectRatio = firstImg.naturalWidth / firstImg.naturalHeight;
                    console.log('📱 Screenshot dimensions:', firstImg.naturalWidth, 'x', firstImg.naturalHeight);
                    console.log('📐 Screenshot aspect ratio:', aspectRatio);
                    
                    if (firstImg.naturalHeight > 2000 || aspectRatio < 0.5) {
                        this.gallery.classList.add('android');
                        console.log('🤖 Added android class for tall screenshot');
                    } else if (aspectRatio > 0.48) {
                        this.gallery.classList.add('android');
                        console.log('🤖 Added android class for wider aspect ratio');
                    } else {
                        console.log('🍎 Using iPhone sizing');
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
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.prevSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.nextSlide();
            });
        }
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Enhanced hover interactions
        this.gallery.addEventListener('mouseenter', () => {
            this.pauseAutoplay();
            this.gallery.classList.add('gallery-hovered');
        });
        
        this.gallery.addEventListener('mouseleave', () => {
            this.startAutoplay();
            this.gallery.classList.remove('gallery-hovered');
        });
        
        // Optimized touch/swipe support with better performance
        let startX = 0;
        let startY = 0;
        let startTime = 0;
        
        this.gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
        }, { passive: true });
        
        this.gallery.addEventListener('touchend', (e) => {
            if (this.isTransitioning) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            const timeDiff = Date.now() - startTime;
            
            // Enhanced swipe detection
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30 && timeDiff < 500) {
                e.preventDefault();
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        }, { passive: false });
        
        // Keyboard navigation with better responsiveness
        document.addEventListener('keydown', (e) => {
            if (this.gallery.matches(':hover') || this.gallery.contains(document.activeElement)) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextSlide();
                }
            }
        });
    }
    
    goToSlide(slideIndex, direction = 'next') {
        if (this.isTransitioning || slideIndex === this.currentSlide) return;
        
        const targetDirection = slideIndex > this.currentSlide ? 'next' : 'prev';
        this.performDramaticTransition(this.currentSlide, slideIndex, targetDirection);
        this.currentSlide = slideIndex;
        this.updateDots();
        this.updateCounter();
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.performDramaticTransition(this.currentSlide, nextIndex, 'next');
        this.currentSlide = nextIndex;
        this.updateDots();
        this.updateCounter();
    }
    
    prevSlide() {
        if (this.isTransitioning) return;
        
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.performDramaticTransition(this.currentSlide, prevIndex, 'prev');
        this.currentSlide = prevIndex;
        this.updateDots();
        this.updateCounter();
    }
    
    performDramaticTransition(fromIndex, toIndex, direction) {
        this.isTransitioning = true;
        
        const currentScreenshot = this.screenshots[fromIndex];
        const nextScreenshot = this.screenshots[toIndex];
        
        // Add transitioning class to screen for enhanced glow effect
        if (this.screen) {
            this.screen.classList.add('transitioning');
        }
        
        // Enhanced class cleanup - remove ALL animation classes
        this.screenshots.forEach(screenshot => {
            screenshot.classList.remove(
                'active', 'prev', 'next',
                'holo-exit-right', 'holo-enter-left',
                'holo-exit-left', 'holo-enter-right',
                'matrix-exit', 'matrix-enter',
                'quantum-exit', 'quantum-enter'
            );
        });
        
        const duration = this.animationDuration[this.currentMode];
        
        if (this.currentMode === 'holo') {
            // DRAMATIC HOLOGRAPHIC FLYING ANIMATIONS
            if (direction === 'next') {
                // Going forward: current flies dramatically to the right, new enters from left
                currentScreenshot.classList.add('holo-exit-right');
                nextScreenshot.classList.add('holo-enter-left');
                console.log('✨ FLYING RIGHT: Current screenshot flying out dramatically →');
            } else {
                // Going backward: current flies dramatically to the left, new enters from right
                currentScreenshot.classList.add('holo-exit-left');
                nextScreenshot.classList.add('holo-enter-right');
                console.log('✨ FLYING LEFT: Current screenshot flying out dramatically ←');
            }
            
        } else if (this.currentMode === 'matrix') {
            // Matrix digital disintegration
            currentScreenshot.classList.add('matrix-exit');
            nextScreenshot.classList.add('matrix-enter');
            console.log('🌐 Starting MATRIX digital disintegration');
            
        } else if (this.currentMode === 'quantum') {
            // Quantum tunnel effect
            currentScreenshot.classList.add('quantum-exit');
            nextScreenshot.classList.add('quantum-enter');
            console.log('⚛️ Starting QUANTUM tunnel effect');
        }
        
        // Use requestAnimationFrame for smoother completion
        const completeTransition = () => {
            // Clean up ALL animation classes
            this.screenshots.forEach(screenshot => {
                screenshot.classList.remove(
                    'holo-exit-right', 'holo-enter-left',
                    'holo-exit-left', 'holo-enter-right',
                    'matrix-exit', 'matrix-enter',
                    'quantum-exit', 'quantum-enter'
                );
            });
            
            // Set the new active screenshot
            nextScreenshot.classList.add('active');
            
            // Remove screen glow
            if (this.screen) {
                this.screen.classList.remove('transitioning');
            }
            
            this.isTransitioning = false;
            console.log('🎯 Dramatic transition completed successfully');
        };
        
        // Complete the transition with proper timing
        setTimeout(() => {
            requestAnimationFrame(completeTransition);
        }, duration);
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
        this.pauseAutoplay(); // Clear any existing interval
        this.autoplayInterval = setInterval(() => {
            if (!this.isTransitioning) {
                this.nextSlide();
            }
        }, 7000); // Longer interval for dramatic animations
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
    
    // Method to change animation mode dynamically
    setAnimationMode(mode) {
        if (this.animationModes[mode.toUpperCase()]) {
            // Remove old mode class
            this.gallery.classList.remove(`${this.currentMode}-mode`);
            
            // Set new mode
            this.currentMode = this.animationModes[mode.toUpperCase()];
            
            // Add new mode class
            this.gallery.classList.add(`${this.currentMode}-mode`);
            
            console.log(`🎨 Animation mode changed to: ${this.currentMode.toUpperCase()}`);
        }
    }
    
    // Force GPU acceleration method
    enableGPUAcceleration() {
        this.screenshots.forEach(screenshot => {
            screenshot.style.transform = 'translateZ(0)';
            screenshot.style.willChange = 'transform, opacity, filter';
        });
        console.log('🚀 GPU acceleration forced for all screenshots');
    }
    
    // Preload next/previous images for instant transitions
    preloadAdjacentImages() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        
        [prevIndex, nextIndex].forEach(index => {
            const img = this.screenshots[index];
            if (img && !img.complete) {
                const tempImg = new Image();
                tempImg.src = img.src;
            }
        });
    }
    
    // Clean up resources when gallery is destroyed
    destroy() {
        this.pauseAutoplay();
        
        // Remove all event listeners
        if (this.prevBtn) {
            this.prevBtn.removeEventListener('click', this.prevSlide);
        }
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', this.nextSlide);
        }
        
        // Clean up animation classes
        this.screenshots.forEach(screenshot => {
            screenshot.style.willChange = 'auto';
            screenshot.classList.remove('active', 'holo-exit-right', 'holo-enter-left', 
                'holo-exit-left', 'holo-enter-right');
        });
        
        console.log('🧹 Gallery cleaned up and destroyed');
    }
}

// Enhanced initialization with error handling
document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.screenshot-gallery');
    console.log(`🎭 Initializing ${galleries.length} galleries with DRAMATIC FLYING EFFECTS`);
    
    galleries.forEach((gallery, index) => {
        try {
            const galleryInstance = new ScreenshotGallery(gallery);
            // Store instance on the element for later access
            gallery.screenshotGallery = galleryInstance;
            console.log(`✅ Gallery ${index + 1} initialized successfully with holographic flying animations`);
        } catch (error) {
            console.error(`❌ Error initializing gallery ${index + 1}:`, error);
        }
    });
});

// Global function to reinitialize galleries if needed
window.reinitializeGalleries = () => {
    const galleries = document.querySelectorAll('.screenshot-gallery');
    console.log('🔄 Reinitializing all galleries...');
    
    galleries.forEach((gallery, index) => {
        // Destroy existing instance if it exists
        if (gallery.screenshotGallery) {
            gallery.screenshotGallery.destroy();
        }
        
        try {
            gallery.screenshotGallery = new ScreenshotGallery(gallery);
            console.log(`✅ Gallery ${index + 1} reinitialized successfully`);
        } catch (error) {
            console.error(`❌ Error reinitializing gallery ${index + 1}:`, error);
        }
    });
};

// Global function to change animation mode for all galleries
window.setAllGalleriesAnimationMode = (mode) => {
    const galleries = document.querySelectorAll('.screenshot-gallery');
    console.log(`🎨 Changing all galleries to ${mode.toUpperCase()} mode...`);
    
    galleries.forEach((gallery, index) => {
        if (gallery.screenshotGallery) {
            gallery.screenshotGallery.setAnimationMode(mode);
            console.log(`✅ Gallery ${index + 1} mode changed to ${mode.toUpperCase()}`);
        }
    });
};

// Global function to enable performance mode for all galleries
window.enablePerformanceMode = () => {
    const galleries = document.querySelectorAll('.screenshot-gallery');
    console.log('🚀 Enabling performance mode for all galleries...');
    
    galleries.forEach((gallery, index) => {
        if (gallery.screenshotGallery) {
            gallery.screenshotGallery.enableGPUAcceleration();
            gallery.screenshotGallery.preloadAdjacentImages();
            console.log(`⚡ Performance mode enabled for gallery ${index + 1}`);
        }
    });
};

// Performance monitoring and optimization
const optimizeForDevice = () => {
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                           navigator.deviceMemory <= 2;
    
    if (isLowEndDevice) {
        console.log('📱 Low-end device detected, optimizing animations...');
        document.documentElement.style.setProperty('--animation-duration', '1.2s');
        document.documentElement.style.setProperty('--blur-intensity', '2px');
    } else {
        console.log('🖥️ High-end device detected, using full dramatic effects');
        document.documentElement.style.setProperty('--animation-duration', '1.8s');
        document.documentElement.style.setProperty('--blur-intensity', '4px');
    }
};

// Run device optimization on load
if (typeof navigator !== 'undefined') {
    optimizeForDevice();
}