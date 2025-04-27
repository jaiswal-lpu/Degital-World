// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    initFormValidation();
    
    // Initialize form submission
    initFormSubmission();
    
    // Initialize form reset buttons
    initFormReset();
    
    // Initialize form animations
    initFormAnimations();
});

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Add validation classes and messages
        inputs.forEach(input => {
            // Skip submit buttons
            if (input.type === 'submit') return;
            
            // Create validation message element
            const validationMessage = document.createElement('div');
            validationMessage.className = 'validation-message';
            input.parentNode.appendChild(validationMessage);
            
            // Input validation on blur
            input.addEventListener('blur', function() {
                validateInput(input, validationMessage);
            });
            
            // Input validation on input
            input.addEventListener('input', function() {
                validateInput(input, validationMessage);
            });
        });
        
        // Form submission validation
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                // Skip submit buttons
                if (input.type === 'submit') return;
                
                const validationMessage = input.parentNode.querySelector('.validation-message');
                const valid = validateInput(input, validationMessage);
                
                if (!valid) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first invalid input
                const firstInvalid = form.querySelector('.invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalid.focus();
                }
            }
        });
    });
}

// Validate individual input
function validateInput(input, validationMessage) {
    let isValid = true;
    let message = '';
    
    // Remove existing validation classes
    input.classList.remove('valid', 'invalid');
    
    // Check if required
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        message = 'This field is required';
    }
    // Email validation
    else if (input.type === 'email' && input.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    // Phone validation
    else if (input.type === 'tel' && input.value.trim()) {
        const phonePattern = /^[\d\s\+\-$$$$]{7,20}$/;
        if (!phonePattern.test(input.value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }
    
    // Add appropriate class and message
    if (input.value.trim()) {
        if (isValid) {
            input.classList.add('valid');
        } else {
            input.classList.add('invalid');
        }
    }
    
    validationMessage.textContent = message;
    
    return isValid;
}

// Form Submission
function initFormSubmission() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        const formId = form.id;
        const successElement = document.getElementById(`${formId}-success`);
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual AJAX in production)
            setTimeout(function() {
                // Hide form and show success message
                form.style.display = 'none';
                if (successElement) {
                    successElement.style.display = 'block';
                }
                
                // Reset form
                form.reset();
                
                // Reset button
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 2000);
        });
    });
}

// Form Reset
function initFormReset() {
    const resetButtons = document.querySelectorAll('.reset-form');
    
    resetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const formId = this.getAttribute('data-form');
            const form = document.getElementById(`${formId}-form`);
            const successElement = document.getElementById(`${formId}-success`);
            
            if (form && successElement) {
                // Hide success message and show form
                successElement.style.display = 'none';
                form.style.display = 'block';
                
                // Reset form fields
                form.reset();
                
                // Remove validation classes
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });
                
                // Clear validation messages
                const validationMessages = form.querySelectorAll('.validation-message');
                validationMessages.forEach(message => {
                    message.textContent = '';
                });
            }
        });
    });
}

// Form Animations
function initFormAnimations() {
    // Animate form fields on focus
    const formFields = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('field-focus');
        });
        
        field.addEventListener('blur', function() {
            this.parentNode.classList.remove('field-focus');
        });
    });
    
    // Animate form submission
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            this.classList.add('form-submitting');
        });
    });
}

// Add CSS styles for form animations
function addFormStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .form-group {
            position: relative;
            transition: transform 0.3s ease;
        }
        
        .field-focus {
            transform: translateX(5px);
        }
        
        .form-submitting {
            animation: formSubmit 0.5s ease;
        }
        
        @keyframes formSubmit {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(0.95);
                opacity: 0.8;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .validation-message {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            height: 1.25rem;
        }
        
        input.valid, textarea.valid, select.valid {
            border-color: #10b981 !important;
        }
        
        input.invalid, textarea.invalid, select.invalid {
            border-color: #ef4444 !important;
        }
        
        .form-success {
            animation: fadeIn 0.5s ease;
        }
    `;
    
    document.head.appendChild(style);
}

// Add form styles
addFormStyles();

// Form field floating labels
function initFloatingLabels() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Check if input has value on load
            if (input.value) {
                label.classList.add('float');
            }
            
            // Add float class on focus or when input has value
            input.addEventListener('focus', function() {
                label.classList.add('float');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.classList.remove('float');
                }
            });
        }
    });
}

// Initialize floating labels
initFloatingLabels();

// Form field character counter
function initCharacterCounter() {
    const textareas = document.querySelectorAll('textarea[maxlength]');
    
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        
        // Create counter element
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = `0/${maxLength}`;
        textarea.parentNode.appendChild(counter);
        
        // Update counter on input
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            
            // Add warning class when approaching limit
            if (currentLength > maxLength * 0.8) {
                counter.classList.add('char-warning');
            } else {
                counter.classList.remove('char-warning');
            }
        });
    });
}

// Initialize character counter
initCharacterCounter();