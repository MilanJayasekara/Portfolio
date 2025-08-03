// Portfolio Filter
document.addEventListener('DOMContentLoaded', function() {
    // Filter portfolio items
    const filterButtons = document.querySelectorAll('[data-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form validation
    const contactForm = document.querySelector('form[action="contact.php"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            
            // Validate name
            const nameInput = this.querySelector('#name');
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('is-invalid');
                valid = false;
            } else {
                nameInput.classList.remove('is-invalid');
            }
            
            // Validate email
            const emailInput = this.querySelector('#email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '' || !emailRegex.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                valid = false;
            } else {
                emailInput.classList.remove('is-invalid');
            }
            
            // Validate message
            const messageInput = this.querySelector('#message');
            if (messageInput.value.trim() === '') {
                messageInput.classList.add('is-invalid');
                valid = false;
            } else {
                messageInput.classList.remove('is-invalid');
            }
            
            if (!valid) {
                e.preventDefault();
            }
        });
    }
});