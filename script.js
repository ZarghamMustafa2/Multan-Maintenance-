document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const menuLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
    };

    menuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Form Submission Logic (AJAX with Formspree)
    const bookingForm = document.getElementById('booking-form');
    const successMsg = document.getElementById('success-message');
    const formContainer = bookingForm.parentElement;

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(bookingForm);
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="animate-pulse">Booking...</span>';

        try {
            // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree ID: https://formspree.io/
            const response = await fetch('https://formspree.io/f/placeholder', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show Success Message
                bookingForm.classList.add('hidden');
                successMsg.classList.remove('hidden');
                successMsg.classList.add('flex');
            } else {
                alert('Oops! There was a problem submitting your form. Please try again.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Confirm Booking';
            }
        } catch (error) {
            alert('Something went wrong. Please check your connection or try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Confirm Booking';
        }
    });

    // Search Bar Logic
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const servicesGrid = document.getElementById('services-grid');
    const noServicesMsg = document.getElementById('no-services-msg');

    if (searchInput && servicesGrid && noServicesMsg) {
        const serviceCards = Array.from(servicesGrid.children);

        const filterServices = () => {
            const query = searchInput.value.toLowerCase().trim();
            let hasVisibleCards = false;

            serviceCards.forEach(card => {
                const titleElement = card.querySelector('h3');
                const descElement = card.querySelector('p');
                
                if (titleElement) {
                    const title = titleElement.textContent.toLowerCase();
                    const desc = descElement ? descElement.textContent.toLowerCase() : '';
                    
                    if (title.includes(query) || desc.includes(query)) {
                        card.style.display = '';
                        hasVisibleCards = true;
                    } else {
                        card.style.display = 'none';
                    }
                }
            });

            // Show 'Not found' message if zero matches, otherwise hide it
            if (!hasVisibleCards) {
                noServicesMsg.classList.remove('hidden');
            } else {
                noServicesMsg.classList.add('hidden');
            }
        };

        // Instantly filter on every keystroke
        searchInput.addEventListener('input', filterServices);
        
        // Enhance UX by scrolling to services when they click 'Search' button
        if (searchButton) {
            searchButton.addEventListener('click', (e) => {
                e.preventDefault();
                filterServices();
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
});
