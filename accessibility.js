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
