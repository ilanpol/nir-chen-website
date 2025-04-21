// קוד מייצר כפתור נגישות פשוט
(function() {
    // יצירת סגנונות CSS למאפייני הנגישות
    var styleEl = document.createElement('style');
    styleEl.innerHTML = `
        .a11y-btn {
            position: fixed;
            left: 20px;
            bottom: 20px;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background-color: #0c4a6e;
            color: white;
            font-weight: bold;
            border: none;
            cursor: pointer;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }
        .a11y-menu {
            position: fixed;
            left: 20px;
            bottom: 70px;
            width: 220px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 99999;
            padding: 15px;
            display: none;
            border: 1px solid #0c4a6e;
            color: #333;
            direction: rtl;
            text-align: right;
        }
        .a11y-menu h3 {
            margin-top: 0;
            margin-bottom: 10px;
            color: #0c4a6e;
            font-weight: bold;
            font-size: 16px;
        }
        .a11y-option {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        .a11y-option input {
            margin-left: 8px;
        }
        .a11y-menu button {
            width: 100%;
            padding: 8px;
            background-color: #0c4a6e;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        .a11y-larger-text {
            font-size: 120% !important;
            line-height: 1.5 !important;
        }
        .a11y-high-contrast {
            background-color: black !important;
            color: white !important;
        }
        .a11y-high-contrast a,
        .a11y-high-contrast button,
        .a11y-high-contrast h1,
        .a11y-high-contrast h2,
        .a11y-high-contrast h3,
        .a11y-high-contrast h4 {
            color: yellow !important;
        }
    `;
    document.head.appendChild(styleEl);

    // המתן לטעינת ה-DOM לפני הוספת אלמנטים
    window.addEventListener('DOMContentLoaded', function() {
        // יצירת כפתור הנגישות
        var a11yBtn = document.createElement('button');
        a11yBtn.className = 'a11y-btn';
        a11yBtn.textContent = 'נג';
        a11yBtn.setAttribute('aria-label', 'פתח תפריט נגישות');
        document.body.appendChild(a11yBtn);

        // יצירת תפריט נגישות
        var a11yMenu = document.createElement('div');
        a11yMenu.className = 'a11y-menu';
        a11yMenu.innerHTML = `
            <h3>הגדרות נגישות</h3>
            <div class="a11y-option">
                <input type="checkbox" id="a11y-larger-text">
                <label for="a11y-larger-text">הגדלת טקסט</label>
            </div>
            <div class="a11y-option">
                <input type="checkbox" id="a11y-high-contrast">
                <label for="a11y-high-contrast">ניגודיות גבוהה</label>
            </div>
            <button id="a11y-reset">איפוס הגדרות</button>
        `;
        document.body.appendChild(a11yMenu);

        // אירוע לחיצה על כפתור פתיחת התפריט
        a11yBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (a11yMenu.style.display === 'block') {
                a11yMenu.style.display = 'none';
            } else {
                a11yMenu.style.display = 'block';
            }
        });

        // אירוע לחיצה על הגדלת טקסט
        document.getElementById('a11y-larger-text').addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('a11y-larger-text');
            } else {
                document.body.classList.remove('a11y-larger-text');
            }
        });

        // אירוע לחיצה על ניגודיות גבוהה
        document.getElementById('a11y-high-contrast').addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('a11y-high-contrast');
            } else {
                document.body.classList.remove('a11y-high-contrast');
            }
        });

        // אירוע לחיצה על איפוס הגדרות
        document.getElementById('a11y-reset').addEventListener('click', function() {
            document.getElementById('a11y-larger-text').checked = false;
            document.getElementById('a11y-high-contrast').checked = false;
            document.body.classList.remove('a11y-larger-text', 'a11y-high-contrast');
            alert('הגדרות הנגישות אופסו בהצלחה');
        });

        // סגירת התפריט בלחיצה מחוץ לאזור
        document.addEventListener('click', function(e) {
            if (e.target !== a11yBtn && !a11yMenu.contains(e.target) && a11yMenu.style.display === 'block') {
                a11yMenu.style.display = 'none';
            }
        });
    });

    // תגית מחליפה ל-DOMContentLoaded במקרה שהדף כבר נטען
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(function() {
            var event = document.createEvent('Event');
            event.initEvent('DOMContentLoaded', true, false);
            document.dispatchEvent(event);
        }, 1);
    }
})();
// הוסף את זה לקובץ ה-accessibility.js שכבר יצרת
window.addEventListener('DOMContentLoaded', function() {
    // מחפש את הכותרת שמכילה את המילה "מימון"
    let headings = document.querySelectorAll('h1, h2, h3, div');
    headings.forEach(function(heading) {
        if (heading.innerText && heading.innerText.includes('מימון')) {
            // מסיר את כל הסגנונות שעשויים ליצור קו
            heading.style.borderBottom = 'none';
            heading.style.textDecoration = 'none';
            heading.style.boxShadow = 'none';
            
            // מסיר גם את הפסאודו-אלמנטים אם יש כאלה
            let style = document.createElement('style');
            style.innerHTML = `
                #${heading.id}::after, #${heading.id}::before,
                .${heading.className.split(' ').join('::')}::after, .${heading.className.split(' ').join('::')}::before {
                    display: none !important;
                    content: none !important;
                    border: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    });
    
    // ניסיון ספציפי יותר - מחפש את האלמנט בהתבסס על מיקום במבנה העמוד
    let heroSection = document.querySelector('.hero-gradient, [id="home"], section[class*="hero"]');
    if (heroSection) {
        let mainHeadings = heroSection.querySelectorAll('h1, h2');
        mainHeadings.forEach(function(heading) {
            heading.style.borderBottom = 'none';
            heading.style.textDecoration = 'none';
            let afterStyle = window.getComputedStyle(heading, '::after');
            if (afterStyle.content || afterStyle.borderBottom) {
                let style = document.createElement('style');
                style.innerHTML = `
                    ${heading.tagName.toLowerCase()}${heading.id ? '#'+heading.id : ''}${heading.className ? '.'+heading.className.split(' ').join('.') : ''}::after {
                        display: none !important;
                        content: none !important;
                        border: none !important;
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }
});
