const message = document.getElementById('message');
const button = document.getElementById('reaction-button');
const result = document.getElementById('result');

let startTime;

setTimeout(() => {
  const randomDelay = Math.random() * 4000 + 1000; // от 1 до 5 секунд
  setTimeout(() => {
    button.disabled = false;
    message.textContent = 'Нажимай!';
    startTime = Date.now();
  }, randomDelay);
}, 3000);

button.addEventListener('click', () => {
  const endTime = Date.now();
  const reactionTime = endTime - startTime;
  result.textContent = `Ваше время реакции: ${reactionTime} мс`;
  button.disabled = true;
});
