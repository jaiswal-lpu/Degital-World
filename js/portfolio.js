// Portfolio Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio filter
    initPortfolioFilter();
    
    // Initialize portfolio item hover effects
    initPortfolioHover();
    
    // Initialize portfolio item animations
    initPortfolioAnimations();
});

// Portfolio Filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        // Show all items initially
        portfolioItems.forEach(item => {
            item.style.display = 'block';
        });
        
        // Filter items on button click
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Portfolio Hover Effects
function initPortfolioHover() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.portfolio-overlay').style.opacity = '1';
            this.querySelector('.overlay-content').style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.portfolio-overlay').style.opacity = '0';
            this.querySelector('.overlay-content').style.transform = 'translateY(20px)';
        });
    });
}

// Portfolio Animations
function initPortfolioAnimations() {
    // Animate portfolio items on scroll
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    portfolioItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .portfolio-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .portfolio-item:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .portfolio-item:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .portfolio-item:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .portfolio-item:nth-child(5) {
            transition-delay: 0.4s;
        }
        
        .portfolio-item:nth-child(6) {
            transition-delay: 0.5s;
        }
        
        .portfolio-item:nth-child(7) {
            transition-delay: 0.6s;
        }
        
        .portfolio-item:nth-child(8) {
            transition-delay: 0.7s;
        }
    `;
    
    document.head.appendChild(style);
}