// main.js - Core JavaScript for EhtAlem Community Hub

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const initMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
};

// Animated counter for statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };

        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
};

// Form validation and submission
const initForms = () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    showError(field, 'This field is required');
                } else {
                    field.classList.remove('error');
                    removeError(field);
                }
            });

            if (isValid) {
                // Show loading state
                const submitBtn = form.querySelector('[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;

                // Simulate API call (replace with actual endpoint)
                try {
                    // For now, just show success message
                    setTimeout(() => {
                        showSuccessMessage('Thank you! We\'ll be in touch soon.');
                        form.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 1500);
                } catch (error) {
                    showErrorMessage('Something went wrong. Please try again.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    });
};

// Helper functions for form validation
const showError = (field, message) => {
    let errorDiv = field.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
    errorDiv.textContent = message;
};

const removeError = (field) => {
    const errorDiv = field.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.remove();
    }
};

const showSuccessMessage = (message) => {
    showNotification(message, 'success');
};

const showErrorMessage = (message) => {
    showNotification(message, 'error');
};

const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Scroll animations
const initScrollAnimations = () => {
    const elements = document.querySelectorAll('.feature-card, .journey-step, .cta-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
};

// Add scroll-to-top button
const createScrollToTop = () => {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    animateCounters();
    initForms();
    initScrollAnimations();
    createScrollToTop();
});
