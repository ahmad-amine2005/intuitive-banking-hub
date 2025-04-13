
// Toast notification system
const toast = {
  container: document.getElementById('toastContainer'),
  
  show(title, description, type = 'success', duration = 3000) {
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = `toast toast-${type}`;
    
    // Create toast content
    toastEl.innerHTML = `
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-description">${description}</div>
      </div>
      <button class="toast-close">&times;</button>
    `;
    
    // Add to container
    this.container.appendChild(toastEl);
    
    // Add event listener to close button
    const closeBtn = toastEl.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.hide(toastEl));
    
    // Auto hide after duration
    setTimeout(() => this.hide(toastEl), duration);
  },
  
  hide(toastEl) {
    toastEl.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => {
      if (toastEl.parentNode === this.container) {
        this.container.removeChild(toastEl);
      }
    }, 300);
  }
};
