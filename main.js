/* ==========================================================================
   BOMBAY BIRYANI Catering Services - JavaScript Logic
   Owner: Avez Khan | Contact: 7304650214 / 9322384772
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 80
        });
    }

    // 2. Hero Background Slideshow
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000);
    }

    // 3. Menu Category Filtering (Biryani, Mughlai, Chinese, Continental, Juices, Ice Creams)
    const filterBtns = document.querySelectorAll('.btn-menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.classList.add('animate-fadeIn');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 4. Dynamic Catering Cost Estimator Calculator
    const guestSlider = document.getElementById('guestSlider');
    const guestCountDisplay = document.getElementById('guestCountDisplay');
    const calcPriceDisplay = document.getElementById('calcPriceDisplay');
    const gradeBtns = document.querySelectorAll('.btn-calc-grade');
    const calcWhatsAppBtn = document.getElementById('calcWhatsAppBtn');

    let currentRate = 250; // Default Silver grade rate

    function calculateEstimate() {
        if (!guestSlider || !calcPriceDisplay) return;
        
        const guestCount = parseInt(guestSlider.value);
        if (guestCountDisplay) guestCountDisplay.textContent = guestCount;

        const totalCost = guestCount * currentRate;
        const formattedCost = '₹' + totalCost.toLocaleString('en-IN');
        calcPriceDisplay.textContent = formattedCost;

        // Update WhatsApp enquiry link
        if (calcWhatsAppBtn) {
            const message = `Hi Avez Khan, I used your website calculator. I am planning an event for ${guestCount} guests at ₹${currentRate}/plate (Estimated Total: ${formattedCost}). Please send me full menu details!`;
            calcWhatsAppBtn.href = `https://wa.me/917304650214?text=${encodeURIComponent(message)}`;
        }
    }

    if (guestSlider) {
        guestSlider.addEventListener('input', calculateEstimate);
    }

    gradeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gradeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentRate = parseInt(btn.getAttribute('data-rate'));
            calculateEstimate();
        });
    });

    // Run initial calculation
    calculateEstimate();

    // 5. Booking & Enquiry Form Submission Handler
    const enquiryForm = document.getElementById('cateringEnquiryForm');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('custName')?.value.trim() || '';
            const phone = document.getElementById('custPhone')?.value.trim() || '';
            const eventType = document.getElementById('eventType')?.value || '';
            const guestNum = document.getElementById('guestNum')?.value || '';
            const eventDate = document.getElementById('eventDate')?.value || '';
            const details = document.getElementById('custDetails')?.value.trim() || '';

            if (!name || !phone || !eventType || !guestNum || !eventDate) {
                alert('Please fill in all required fields.');
                return;
            }

            const waMessage = `*New Catering Enquiry - Bombay Biryani*\n\n` +
                              `👤 *Name:* ${name}\n` +
                              `📞 *Phone:* ${phone}\n` +
                              `🎉 *Event:* ${eventType}\n` +
                              `👥 *Guests:* ${guestNum}\n` +
                              `📅 *Date:* ${eventDate}\n` +
                              (details ? `📝 *Wishes/Notes:* ${details}\n\n` : '\n') +
                              `Please contact me back with pricing and menu options!`;

            const whatsappUrl = `https://wa.me/917304650214?text=${encodeURIComponent(waMessage)}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
        });
    }
});
