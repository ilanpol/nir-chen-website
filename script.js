document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
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
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            answer.classList.toggle('hidden');
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }
        });
    });
    
    // Accessibility Widget Toggle
    const accessibilityWidget = document.querySelector('.accessibility-widget');
    const accessibilityMenu = document.getElementById('accessibility-menu');
    
    if (accessibilityWidget && accessibilityMenu) {
        accessibilityWidget.addEventListener('click', function() {
            accessibilityMenu.classList.toggle('open');
        });
        
        // Close accessibility menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!accessibilityWidget.contains(e.target) && !accessibilityMenu.contains(e.target)) {
                accessibilityMenu.classList.remove('open');
            }
        });
    }
    
    // Accessibility Options
    const fontLargeCheckbox = document.getElementById('font-large');
    const highContrastCheckbox = document.getElementById('high-contrast');
    const grayscaleCheckbox = document.getElementById('grayscale');
    const linksUnderlineCheckbox = document.getElementById('links-underline');
    
    // Load saved accessibility settings from localStorage
    loadAccessibilitySettings();
    
    // Font Size Toggle
    if (fontLargeCheckbox) {
        fontLargeCheckbox.addEventListener('change', function() {
            document.body.classList.toggle('font-large', this.checked);
            saveAccessibilitySetting('font-large', this.checked);
        });
    }
    
    // High Contrast Toggle
    if (highContrastCheckbox) {
        highContrastCheckbox.addEventListener('change', function() {
            document.body.classList.toggle('high-contrast', this.checked);
            saveAccessibilitySetting('high-contrast', this.checked);
        });
    }
    
    // Grayscale Toggle
    if (grayscaleCheckbox) {
        grayscaleCheckbox.addEventListener('change', function() {
            document.body.classList.toggle('grayscale', this.checked);
            saveAccessibilitySetting('grayscale', this.checked);
        });
    }
    
    // Links Underline Toggle
    if (linksUnderlineCheckbox) {
        linksUnderlineCheckbox.addEventListener('change', function() {
            document.body.classList.toggle('links-underline', this.checked);
            saveAccessibilitySetting('links-underline', this.checked);
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Display loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<div class="loader"></div>';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Reset form
                contactForm.reset();
                
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Show success message
                alert('תודה על פנייתך! נציג יחזור אליך בהקדם.');
            }, 1500);
        });
    }
    
    // Calculator functionality
    const calculateButton = document.getElementById('calculate-button');
    
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateCheck);
    }
});

// Check calculator function
function calculateCheck() {
    const checkAmount = parseFloat(document.getElementById('check-amount').value);
    const checkDate = new Date(document.getElementById('check-date').value);
    const today = new Date();
    
    // Validate inputs
    if (isNaN(checkAmount) || !checkDate) {
        alert('נא להזין סכום ותאריך תקינים');
        return;
    }
    
    if (checkDate <= today) {
        alert('תאריך הפירעון חייב להיות בעתיד');
        return;
    }
    
    // Add 4 days to check date as per the note
    const adjustedCheckDate = new Date(checkDate);
    adjustedCheckDate.setDate(adjustedCheckDate.getDate() + 4);
    
    // Calculate days difference
    const daysDifference = Math.ceil((adjustedCheckDate - today) / (1000 * 60 * 60 * 24));
    
    // Calculate months difference (approximated)
    const monthsDifference = daysDifference / 30;
    
    // Calculate commission: 2% per month + 100 NIS handling fee
    const ratePerMonth = 0.02; // 2%
    const handlingFee = 100;
    const interestAmount = checkAmount * ratePerMonth * monthsDifference;
    const totalCommission = interestAmount + handlingFee;
    
    // Calculate net amount
    const netAmount = checkAmount - totalCommission;
    
    // Update results
    document.getElementById('commission-result').textContent = '₪' + totalCommission.toFixed(0);
    document.getElementById('net-amount-result').textContent = '₪' + netAmount.toFixed(0);
    document.getElementById('days-saved-result').textContent = daysDifference;
}

// Save accessibility settings to localStorage
function saveAccessibilitySetting(setting, value) {
    localStorage.setItem(setting, value);
}

// Load accessibility settings from localStorage
function loadAccessibilitySettings() {
    const fontLargeCheckbox = document.getElementById('font-large');
    const highContrastCheckbox = document.getElementById('high-contrast');
    const grayscaleCheckbox = document.getElementById('grayscale');
    const linksUnderlineCheckbox = document.getElementById('links-underline');
    
    if (fontLargeCheckbox) {
        const fontLarge = localStorage.getItem('font-large') === 'true';
        fontLargeCheckbox.checked = fontLarge;
        document.body.classList.toggle('font-large', fontLarge);
    }
    
    if (highContrastCheckbox) {
        const highContrast = localStorage.getItem('high-contrast') === 'true';
        highContrastCheckbox.checked = highContrast;
        document.body.classList.toggle('high-contrast', highContrast);
    }
    
    if (grayscaleCheckbox) {
        const grayscale = localStorage.getItem('grayscale') === 'true';
        grayscaleCheckbox.checked = grayscale;
        document.body.classList.toggle('grayscale', grayscale);
    }
    
    if (linksUnderlineCheckbox) {
        const linksUnderline = localStorage.getItem('links-underline') === 'true';
        linksUnderlineCheckbox.checked = linksUnderline;
        document.body.classList.toggle('links-underline', linksUnderline);
    }
}

// Add animation when elements are scrolled into view
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they enter the viewport
    const animateElements = document.querySelectorAll('.animate__animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});
