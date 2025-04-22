// אירוע טעינה ראשי
document.addEventListener('DOMContentLoaded', function() {
    
    // טיפול בתפריט נייד
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
        });
    }
    
    // סגירת תפריט נייד בלחיצה על קישור
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
        });
    });
    
    // גלילה חלקה לעוגנים
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // טיפול בשאלות נפוצות
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
    
    // מחשבון ניכיון
    const calculateButton = document.getElementById('calculate-button');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateCheck);
    }
    
    // טופס יצירת קשר (תיקון לשימוש עם Formspree)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // אין צורך ב-preventDefault כי Formspree מטפל בשליחה
            // e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'שולח...';
            submitButton.disabled = true;
            
            // החזרת הכפתור למצב המקורי אחרי 3 שניות
            setTimeout(function() {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 3000);
        });
    }
    
    // אנימציות לאלמנטים שנגללים למסך
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
    
    // יצירת כפתור נגישות
    initializeAccessibility();
    
    // טיפול בקו התחתון (זה הקוד המתוקן שבאמת יעבוד)
    fixHeroUnderline();
});

// פונקציית חישוב ניכיון שיקים
function calculateCheck() {
    const checkAmount = parseFloat(document.getElementById('check-amount').value);
    const checkDate = new Date(document.getElementById('check-date').value);
    const today = new Date();
    
    if (isNaN(checkAmount) || !checkDate || isNaN(checkDate.getTime())) {
        alert('נא להזין סכום ותאריך תקינים');
        return;
    }
    
    if (checkDate <= today) {
        alert('תאריך הפירעון חייב להיות בעתיד');
        return;
    }
    
    const adjustedCheckDate = new Date(checkDate);
    adjustedCheckDate.setDate(adjustedCheckDate.getDate() + 4);
    
    const daysDifference = Math.ceil((adjustedCheckDate - today) / (1000 * 60 * 60 * 24));
    const monthsDifference = daysDifference / 30;
    
    const ratePerMonth = 0.02;
    const handlingFee = 100;
    const interestAmount = checkAmount * ratePerMonth * monthsDifference;
    const totalCommission = interestAmount + handlingFee;
    
    const netAmount = checkAmount - totalCommission;
    
    document.getElementById('commission-result').textContent = '₪' + totalCommission.toFixed(0);
    document.getElementById('net-amount-result').textContent = '₪' + netAmount.toFixed(0);
    document.getElementById('days-saved-result').textContent = daysDifference;
}

// אתחול מערכת הנגישות
function initializeAccessibility() {
    // יצירת כפתור
    const accessBtn = document.createElement('button');
    accessBtn.innerHTML = 'נג';
    accessBtn.setAttribute('aria-label', 'אפשרויות נגישות');
    accessBtn.className = 'accessibility-widget';
    accessBtn.id = 'accessibility-widget';
    document.body.appendChild(accessBtn);
    
    // יצירת תפריט
    const accessMenu = document.createElement('div');
    accessMenu.className = 'accessibility-menu';
    accessMenu.id = 'accessibility-menu';
    accessMenu.innerHTML = `
        <h3 style="margin-top: 0; margin-bottom: 10px; font-weight: bold; color: #0c4a6e;">הגדרות נגישות</h3>
        <div style="margin-bottom: 8px;">
            <input type="checkbox" id="access-larger-text" style="margin-left: 5px;">
            <label for="access-larger-text">הגדלת טקסט</label>
        </div>
        <div style="margin-bottom: 8px;">
            <input type="checkbox" id="access-high-contrast" style="margin-left: 5px;">
            <label for="access-high-contrast">ניגודיות גבוהה</label>
        </div>
        <button id="access-reset" style="width: 100%; background-color: #0c4a6e; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer;">
            איפוס הגדרות
        </button>
    `;
    document.body.appendChild(accessMenu);
    
    // הוספת אירועים
    accessBtn.addEventListener('click', function() {
        accessMenu.classList.toggle('show');
    });
    
    document.addEventListener('click', function(event) {
        if (!accessMenu.contains(event.target) && !accessBtn.contains(event.target)) {
            accessMenu.classList.remove('show');
        }
    });
    
    document.getElementById('access-larger-text').addEventListener('change', function() {
        document.body.classList.toggle('large-font', this.checked);
        try {
            localStorage.setItem('accessibility_large-font', this.checked);
        } catch (e) {
            console.log('localStorage not available');
        }
    });
    
    document.getElementById('access-high-contrast').addEventListener('change', function() {
        document.body.classList.toggle('high-contrast', this.checked);
        try {
            localStorage.setItem('accessibility_high-contrast', this.checked);
        } catch (e) {
            console.log('localStorage not available');
        }
    });
    
    document.getElementById('access-reset').addEventListener('click', function() {
        document.getElementById('access-larger-text').checked = false;
        document.getElementById('access-high-contrast').checked = false;
        document.body.classList.remove('large-font', 'high-contrast');
        try {
            localStorage.clear();
        } catch (e) {
            console.log('localStorage not available');
        }
        alert('ההגדרות אופסו בהצלחה');
    });
    
    // טעינת הגדרות שמורות
    try {
        const largeFontSetting = localStorage.getItem('accessibility_large-font') === 'true';
        const highContrastSetting = localStorage.getItem('accessibility_high-contrast') === 'true';
        
        if (largeFontSetting) {
            document.getElementById('access-larger-text').checked = true;
            document.body.classList.add('large-font');
        }
        if (highContrastSetting) {
            document.getElementById('access-high-contrast').checked = true;
            document.body.classList.add('high-contrast');
        }
    } catch (e) {
        console.log('localStorage not available');
    }
}

// תיקון הקו התחתון בכותרת
function fixHeroUnderline() {
    // הוספת סגנון גלובלי
    const style = document.createElement('style');
    style.textContent = `
        /* הסרת קו תחתון בכותרת */
        .hero-gradient h1::after,
        .hero-gradient h2::after,
        .hero-gradient h1::before,
        .hero-gradient h2::before,
        #home h1::after,
        #home h2::after,
        section[class*="hero"] h1::after,
        section[class*="hero"] h2::after,
        .hero-title::after,
        .hero-title::before,
        .hero-divider {
            display: none !important;
            content: none !important;
            border: none !important;
            border-bottom: none !important;
            height: 0 !important;
            background: none !important;
        }
    `;
    document.head.appendChild(style);
    
    // חיפוש הקו הספציפי והסתרתו
    const heroSection = document.querySelector('.hero-gradient, [id="home"], section[class*="hero"]');
    if (heroSection) {
        const possibleLines = heroSection.querySelectorAll('.hero-divider, hr, [class*="line"], [class*="underline"]');
        possibleLines.forEach(line => {
            if (line.offsetHeight <= 5) { // קווים דקים בלבד
                line.style.display = 'none';
            }
        });
    }
}
