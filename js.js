// Завантаження нотаток при відкритті
window.onload = function () {
    ['personal', 'tasks'].forEach(type => {
      const note = localStorage.getItem(`${type}-note`) || '';
      const lastSaved = localStorage.getItem(`${type}-savedAt`) || '';
      document.getElementById(`${type}-note`).value = note;
      document.querySelector(`#${type} .saved-time`).textContent = lastSaved ? `Останнє збереження: ${lastSaved}` : '';
    });
  };
  
  // Перемикання вкладок
  function switchTab(tabName) {
    const tabs = document.querySelectorAll('.note-window');
    const buttons = document.querySelectorAll('.tab-btn');
  
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
  
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
  }
  
  // Збереження нотатки
  function saveNote(type) {
    const note = document.getElementById(`${type}-note`).value;
    const now = new Date().toLocaleString('uk-UA');
  
    localStorage.setItem(`${type}-note`, note);
    localStorage.setItem(`${type}-savedAt`, now);
  
    document.getElementById('status').textContent = `Нотатка «${type === 'personal' ? 'Особисті' : 'Справи'}» збережена ✅`;
    document.querySelector(`#${type} .saved-time`).textContent = `Останнє збереження: ${now}`;
  
    setTimeout(() => {
      document.getElementById('status').textContent = '';
    }, 3000);
  }
  
  // Автоматичне збереження при друку
  ['personal', 'tasks'].forEach(type => {
    document.addEventListener('DOMContentLoaded', () => {
      const textarea = document.getElementById(`${type}-note`);
      textarea.addEventListener('input', () => saveNote(type));
    });
  });
  
  // Очистити все
  function clearAll() {
    if (confirm("Очистити всі нотатки?")) {
      ['personal', 'tasks'].forEach(type => {
        localStorage.removeItem(`${type}-note`);
        localStorage.removeItem(`${type}-savedAt`);
        document.getElementById(`${type}-note`).value = '';
        document.querySelector(`#${type} .saved-time`).textContent = '';
      });
      document.getElementById('status').textContent = 'Усі нотатки видалено 🗑️';
      setTimeout(() => {
        document.getElementById('status').textContent = '';
      }, 3000);
    }
  }
  