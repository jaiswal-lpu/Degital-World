// Blog Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog animations
    initBlogAnimations();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize blog card hover effects
    initBlogCardHover();
});

// Blog Animations
function initBlogAnimations() {
    // Animate blog cards on scroll
    const blogCards = document.querySelectorAll('.blog-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    blogCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .blog-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .blog-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .blog-card:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .blog-card:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .blog-card:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .blog-card:nth-child(5) {
            transition-delay: 0.4s;
        }
        
        .blog-card:nth-child(6) {
            transition-delay: 0.5s;
        }
        
        .featured-post-card {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterSuccess = document.querySelector('.newsletter-success');
    
    if (newsletterForm && newsletterSuccess) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email input
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Simple validation
            if (email && isValidEmail(email)) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual AJAX in production)
                setTimeout(function() {
                    // Hide form and show success message
                    newsletterForm.style.display = 'none';
                    newsletterSuccess.style.display = 'block';
                    
                    // Reset form
                    newsletterForm.reset();
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                }, 1500);
            } else {
                // Show error
                emailInput.classList.add('error');
                
                // Remove error class after 3 seconds
                setTimeout(function() {
                    emailInput.classList.remove('error');
                }, 3000);
            }
        });
    }
}

// Validate email
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Blog Card Hover Effects
function initBlogCardHover() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.blog-image img').style.transform = 'scale(1.1)';
            this.querySelector('.read-more i').style.transform = 'translateX(5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.blog-image img').style.transform = 'scale(1)';
            this.querySelector('.read-more i').style.transform = 'translateX(0)';
        });
    });
}

// Pagination
document.querySelectorAll('.pagination a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.pagination a').forEach(a => {
            a.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Scroll to top of blog posts
        document.querySelector('.blog-posts').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});