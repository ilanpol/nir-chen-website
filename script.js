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
    if (isNaN(checkAmount) || !checkDate || isNaN(checkDate.getTime())) {
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
    
    console.log('חישוב בוצע:', {
        סכום: checkAmount,
        תאריך: checkDate,
        'ימי המתנה': daysDifference,
        עמלה: totalCommission,
        'סכום נטו': netAmount
    });
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
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // מצא את האלמנט הראשי של התוכן והוסף לו ID
        const mainContent = document.querySelector('section:first-of-type') || document.querySelector('main');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
        
        // תפריט נגישות
        const accessibilityWidget = document.querySelector('.accessibility-widget');
        const accessibilityMenu = document.getElementById('accessibility-menu');
        
        // פונקציונליות פתיחה וסגירה של תפריט
        if (accessibilityWidget && accessibilityMenu) {
            accessibilityWidget.addEventListener('click', function() {
                const isExpanded = accessibilityMenu.classList.contains('show');
                accessibilityMenu.classList.toggle('show');
                accessibilityWidget.setAttribute('aria-expanded', !isExpanded);
                
                // אם התפריט נפתח, התמקד בכותרת שלו
                if (!isExpanded) {
                    const title = document.getElementById('accessibility-dialog-title');
                    if (title) {
                        title.focus();
                    }
                }
            });
            
            // סגירת התפריט בלחיצה מחוץ לו
            document.addEventListener('click', function(event) {
                if (!accessibilityMenu.contains(event.target) && 
                    !accessibilityWidget.contains(event.target) &&
                    accessibilityMenu.classList.contains('show')) {
                    accessibilityMenu.classList.remove('show');
                    accessibilityWidget.setAttribute('aria-expanded', 'false');
                    accessibilityWidget.focus(); // החזרת הפוקוס לכפתור
                }
            });
            
            // טיפול במקש Escape לסגירת התפריט
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && accessibilityMenu.classList.contains('show')) {
                    accessibilityMenu.classList.remove('show');
                    accessibilityWidget.setAttribute('aria-expanded', 'false');
                    accessibilityWidget.focus(); // החזרת הפוקוס לכפתור
                }
            });
        }
        
        // פונקציונאליות אפשרויות הנגישות
        const fontLarge = document.getElementById('font-large');
        const highContrast = document.getElementById('high-contrast');
        const grayscale = document.getElementById('grayscale');
        const linksUnderline = document.getElementById('links-underline');
        const resetButton = document.getElementById('reset-accessibility');
        
        // הגדלת גופן
        if (fontLarge) {
            fontLarge.addEventListener('change', function() {
                document.body.classList.toggle('large-font', this.checked);
                try {
                    localStorage.setItem('accessibility_large-font', this.checked);
                } catch (e) {
                    console.log('localStorage is not available');
                }
            });
        }
        
        // ניגודיות גבוהה
        if (highContrast) {
            highContrast.addEventListener('change', function() {
                document.body.classList.toggle('high-contrast', this.checked);
                try {
                    localStorage.setItem('accessibility_high-contrast', this.checked);
                } catch (e) {
                    console.log('localStorage is not available');
                }
            });
        }
        
        // גווני אפור
        if (grayscale) {
            grayscale.addEventListener('change', function() {
                document.body.classList.toggle('grayscale', this.checked);
                try {
                    localStorage.setItem('accessibility_grayscale', this.checked);
                } catch (e) {
                    console.log('localStorage is not available');
                }
            });
        }
        
        // הדגשת קישורים
        if (linksUnderline) {
            linksUnderline.addEventListener('change', function() {
                document.body.classList.toggle('links-underline', this.checked);
                try {
                    localStorage.setItem('accessibility_links-underline', this.checked);
                } catch (e) {
                    console.log('localStorage is not available');
                }
            });
        }
        
        // איפוס הגדרות
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                // איפוס תצוגת האתר
                document.body.classList.remove('large-font', 'high-contrast', 'grayscale', 'links-underline');
                
                // איפוס checkboxes
                if (fontLarge) fontLarge.checked = false;
                if (highContrast) highContrast.checked = false;
                if (grayscale) grayscale.checked = false;
                if (linksUnderline) linksUnderline.checked = false;
                
                // מחיקת כל ההגדרות מהאחסון המקומי
                try {
                    localStorage.removeItem('accessibility_large-font');
                    localStorage.removeItem('accessibility_high-contrast');
                    localStorage.removeItem('accessibility_grayscale');
                    localStorage.removeItem('accessibility_links-underline');
                } catch (e) {
                    console.log('localStorage is not available');
                }
                
                // הודעה למשתמש
                alert('הגדרות הנגישות אופסו בהצלחה');
            });
        }
        
        // טעינת הגדרות מהאחסון המקומי
        try {
            if (fontLarge) {
                const largeFontSetting = localStorage.getItem('accessibility_large-font') === 'true';
                fontLarge.checked = largeFontSetting;
                document.body.classList.toggle('large-font', largeFontSetting);
            }
            
            if (highContrast) {
                const highContrastSetting = localStorage.getItem('accessibility_high-contrast') === 'true';
                highContrast.checked = highContrastSetting;
                document.body.classList.toggle('high-contrast', highContrastSetting);
            }
            
            if (grayscale) {
                const grayscaleSetting = localStorage.getItem('accessibility_grayscale') === 'true';
                grayscale.checked = grayscaleSetting;
                document.body.classList.toggle('grayscale', grayscaleSetting);
            }
            
            if (linksUnderline) {
                const linksUnderlineSetting = localStorage.getItem('accessibility_links-underline') === 'true';
                linksUnderline.checked = linksUnderlineSetting;
                document.body.classList.toggle('links-underline', linksUnderlineSetting);
            }
        } catch (e) {
            console.log('localStorage is not available');
        }
        
        // שיפור נגישות לשאלות נפוצות (FAQ)
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach((question, index) => {
            const answer = question.nextElementSibling;
            const id = 'faq-answer-' + (index + 1);
            
            // הוספת ARIA attributes
            if (answer) {
                answer.id = id;
                question.setAttribute('aria-expanded', 'false');
                question.setAttribute('aria-controls', id);
                question.setAttribute('role', 'button');
                question.setAttribute('tabindex', '0');
                
                // טיפול באירועי מקש
                question.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        question.click();
                    }
                });
            }
            <script>
    document.addEventListener('DOMContentLoaded', function() {
        // תפריט נגישות פשוט
        const accessibilityWidget = document.getElementById('accessibility-simple-widget');
        const accessibilityMenu = document.getElementById('accessibility-simple-menu');
        
        if (accessibilityWidget && accessibilityMenu) {
            // אירוע לחיצה על כפתור הנגישות
            accessibilityWidget.addEventListener('click', function() {
                accessibilityMenu.classList.toggle('show');
            });
            
            // סגירת התפריט בלחיצה מחוץ לתפריט
            document.addEventListener('click', function(event) {
                if (!accessibilityMenu.contains(event.target) && 
                    !accessibilityWidget.contains(event.target) &&
                    accessibilityMenu.classList.contains('show')) {
                    accessibilityMenu.classList.remove('show');
                }
            });
            
            // הגדלת גופן
            const fontLarge = document.getElementById('simple-font-large');
            if (fontLarge) {
                fontLarge.addEventListener('change', function() {
                    document.body.classList.toggle('large-font', this.checked);
                });
            }
            
            // ניגודיות גבוהה
            const highContrast = document.getElementById('simple-high-contrast');
            if (highContrast) {
                highContrast.addEventListener('change', function() {
                    document.body.classList.toggle('high-contrast', this.checked);
                });
            }
            
            // הדגשת קישורים
            const linksUnderline = document.getElementById('simple-links-underline');
            if (linksUnderline) {
                linksUnderline.addEventListener('change', function() {
                    document.body.classList.toggle('links-underline', this.checked);
                });
            }
            
            // איפוס הגדרות
            const resetButton = document.getElementById('simple-reset-accessibility');
            if (resetButton) {
                resetButton.addEventListener('click', function() {
                    // איפוס תצוגת האתר
                    document.body.classList.remove('large-font', 'high-contrast', 'links-underline');
                    
                    // איפוס checkboxes
                    if (fontLarge) fontLarge.checked = false;
                    if (highContrast) highContrast.checked = false;
                    if (linksUnderline) linksUnderline.checked = false;
                    
                    alert('הגדרות הנגישות אופסו בהצלחה');
                });
            }
        }
    });
</script>
        });
    });
</script>
// accessibility.js
document.addEventListener('DOMContentLoaded', function() {
  // יצירת כפתור הנגישות והוספתו לדף
  const accessBtn = document.createElement('button');
  accessBtn.innerHTML = 'נג';
  accessBtn.setAttribute('aria-label', 'אפשרויות נגישות');
  accessBtn.style.position = 'fixed';
  accessBtn.style.bottom = '20px';
  accessBtn.style.left = '20px';
  accessBtn.style.width = '50px';
  accessBtn.style.height = '50px';
  accessBtn.style.backgroundColor = '#0c4a6e';
  accessBtn.style.color = 'white';
  accessBtn.style.border = 'none';
  accessBtn.style.borderRadius = '50%';
  accessBtn.style.fontSize = '16px';
  accessBtn.style.fontWeight = 'bold';
  accessBtn.style.cursor = 'pointer';
  accessBtn.style.zIndex = '9999';
  accessBtn.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
  
  // הוספת כפתור לעמוד
  document.body.appendChild(accessBtn);
  
  // מטפל באירוע לחיצה
  accessBtn.addEventListener('click', toggleAccessibilityMenu);
  
  // יצירת תפריט הנגישות
  const accessMenu = document.createElement('div');
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
  accessMenu.style.position = 'fixed';
  accessMenu.style.bottom = '80px';
  accessMenu.style.left = '20px';
  accessMenu.style.width = '200px';
  accessMenu.style.backgroundColor = 'white';
  accessMenu.style.color = '#333';
  accessMenu.style.padding = '15px';
  accessMenu.style.borderRadius = '8px';
  accessMenu.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
  accessMenu.style.zIndex = '9999';
  accessMenu.style.display = 'none';
  accessMenu.style.border = '2px solid #0c4a6e';
  accessMenu.id = 'accessibility-menu';
  
  // הוספת תפריט לעמוד
  document.body.appendChild(accessMenu);
  
  // מטפל בפונקציונליות התפריט
  document.getElementById('access-larger-text').addEventListener('change', function() {
    if (this.checked) {
      document.body.style.fontSize = '120%';
    } else {
      document.body.style.fontSize = '';
    }
  });
  
  document.getElementById('access-high-contrast').addEventListener('change', function() {
    if (this.checked) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
      const links = document.querySelectorAll('a, h1, h2, h3');
      links.forEach(link => {
        link.style.color = 'yellow';
      });
    } else {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      const links = document.querySelectorAll('a, h1, h2, h3');
      links.forEach(link => {
        link.style.color = '';
      });
    }
  });
  
  document.getElementById('access-reset').addEventListener('click', function() {
    document.getElementById('access-larger-text').checked = false;
    document.getElementById('access-high-contrast').checked = false;
    document.body.style.fontSize = '';
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    const links = document.querySelectorAll('a, h1, h2, h3');
    links.forEach(link => {
      link.style.color = '';
    });
    alert('ההגדרות אופסו בהצלחה');
  });
  
  // סגירת התפריט בלחיצה מחוץ לאזור
  document.addEventListener('click', function(event) {
    const menu = document.getElementById('accessibility-menu');
    if (event.target !== accessBtn && !menu.contains(event.target) && menu.style.display === 'block') {
      menu.style.display = 'none';
    }
  });
  
  function toggleAccessibilityMenu() {
    const menu = document.getElementById('accessibility-menu');
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  }
});
