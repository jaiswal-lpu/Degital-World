// Advanced Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize text typing animation
    initTypingAnimation();
    
    // Initialize counter animation
    initCounterAnimation();
    
    // Initialize scroll-triggered animations
    initScrollTriggeredAnimations();
    
    // Initialize hover animations
    initHoverAnimations();
    
    // Initialize particle background (if exists)
    initParticleBackground();
    
    // Initialize 3D tilt effect
    init3DTiltEffect();
    
    // Initialize image parallax
    initImageParallax();
    
    // Initialize animated background gradients
    initAnimatedGradients();
    
    // Initialize scroll progress indicator
    initScrollProgress();
});

// Typing Animation
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.animate-typing');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.setAttribute('data-text', text);
        element.textContent = '';
        
        let charIndex = 0;
        const typingSpeed = 100; // milliseconds per character
        
        function typeText() {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, typingSpeed);
            } else {
                // Reset for loop effect (optional)
                setTimeout(() => {
                    element.textContent = '';
                    charIndex = 0;
                    typeText();
                }, 3000);
            }
        }
        
        // Start typing when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeText, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Counter Animation
function initCounterAnimation() {
    const counterElements = document.querySelectorAll('.counter');
    
    counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // milliseconds
        const step = Math.ceil(target / (duration / 16)); // 60fps
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const interval = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(interval);
                        } else {
                            counter.textContent = current;
                        }
                    }, 16);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Scroll-Triggered Animations
function initScrollTriggeredAnimations() {
    // Elements with staggered animations
    const staggerContainers = document.querySelectorAll('.stagger-fade-in');
    
    staggerContainers.forEach(container => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(container);
    });
    
    // Animate elements when they enter viewport
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        const animation = element.getAttribute('data-animation') || 'fadeInUp';
        const delay = element.getAttribute('data-delay') || 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        element.classList.add(animation);
                        element.style.opacity = '1';
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(element);
    });
}

// Hover Animations
function initHoverAnimations() {
    // Hover lift effect
    const liftElements = document.querySelectorAll('.hover-lift');
    
    liftElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Hover scale effect
    const scaleElements = document.querySelectorAll('.hover-scale');
    
    scaleElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Hover glow effect
    const glowElements = document.querySelectorAll('.hover-glow');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

// Particle Background
function initParticleBackground() {
    const particleContainer = document.querySelector('.particle-background');
    
    if (particleContainer) {
        const particleCount = 100;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 5 + 1;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Set styles
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.animationDuration = `${duration}s`;
            
            particleContainer.appendChild(particle);
        }
    }
}

// 3D Tilt Effect
function init3DTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `perspective(1000px) rotateX(${deltaY * -10}deg) rotateY(${deltaX * 10}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Image Parallax
function initImageParallax() {
    const parallaxImages = document.querySelectorAll('.parallax-image');
    
    window.addEventListener('scroll', function() {
        parallaxImages.forEach(image => {
            const rect = image.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollPosition = window.pageYOffset;
                const speed = image.getAttribute('data-speed') || 0.2;
                
                image.style.transform = `translateY(${scrollPosition * speed}px)`;
            }
        });
    });
}

// Animated Background Gradients
function initAnimatedGradients() {
    const gradientElements = document.querySelectorAll('.animate-gradient');
    
    gradientElements.forEach(element => {
        // Create gradient animation
        const colors = [
            'rgba(139, 92, 246, 0.8)',
            'rgba(109, 40, 217, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(190, 24, 93, 0.8)'
        ];
        
        let currentIndex = 0;
        
        function changeGradient() {
            const nextIndex = (currentIndex + 1) % colors.length;
            
            element.style.background = `linear-gradient(45deg, ${colors[currentIndex]}, ${colors[nextIndex]})`;
            
            currentIndex = nextIndex;
            
            setTimeout(changeGradient, 3000);
        }
        
        changeGradient();
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPosition = window.scrollY;
            const scrollPercentage = (scrollPosition / windowHeight) * 100;
            
            progressBar.style.width = `${scrollPercentage}%`;
        });
    }
}

// Text Splitting Animation
function initTextSplitting() {
    const splitTextElements = document.querySelectorAll('.split-text');
    
    splitTextElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        // Split text into characters
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${i * 0.05}s`;
            element.appendChild(span);
        }
    });
}

// Initialize text splitting
initTextSplitting();

// Scroll-triggered section animations
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8) {
            section.classList.add('section-animate');
        }
    });
});

// Animated number counters
const animatedCounters = document.querySelectorAll('.animated-counter');

animatedCounters.forEach(counter => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const duration = 2000; // milliseconds
                const interval = Math.floor(duration / target);
                
                const counterInterval = setInterval(() => {
                    count++;
                    counter.textContent = count;
                    
                    if (count >= target) {
                        clearInterval(counterInterval);
                    }
                }, interval);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
});

// Animated SVG paths
const svgPaths = document.querySelectorAll('.animate-path');

svgPaths.forEach(path => {
    const length = path.getTotalLength();
    
    // Set up the starting position
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the path
                path.style.transition = 'stroke-dashoffset 2s ease-in-out';
                path.style.strokeDashoffset = '0';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(path);
});

// Animated background shapes
function createAnimatedShapes() {
    const shapesContainer = document.querySelector('.animated-shapes');
    
    if (shapesContainer) {
        const shapeCount = 15;
        const shapes = ['circle', 'square', 'triangle'];
        
        for (let i = 0; i < shapeCount; i++) {
            const shape = document.createElement('div');
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            
            shape.classList.add('shape', shapeType);
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 50 + 10;
            
            // Random opacity
            const opacity = Math.random() * 0.3 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            // Set styles
            shape.style.left = `${posX}%`;
            shape.style.top = `${posY}%`;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.opacity = opacity;
            shape.style.animationDuration = `${duration}s`;
            shape.style.animationDelay = `${delay}s`;
            
            shapesContainer.appendChild(shape);
        }
    }
}

// Initialize animated shapes
createAnimatedShapes();