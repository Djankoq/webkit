const progressBar = document.getElementById('progress-bar');
const status = document.getElementById('status');

let width = 0;
const interval = setInterval(() => {
  if (width >= 100) {
    clearInterval(interval);
    status.textContent = 'Готово!';
  } else {
    width += 20;
    progressBar.style.width = width + '%';
    progressBar.textContent = width + '%';
  }
}, 1000);
