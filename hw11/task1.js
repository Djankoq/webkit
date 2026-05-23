console.log('Start');

setTimeout(() => {
  console.log('setTimeout - Macrotask');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise.resolve - Microtask');
});

console.log('End');

/*
Порядок выполнения:
1. 'Start' - синхронный код выполняется немедленно.
2. 'End' - синхронный код выполняется немедленно.
3. 'Promise.resolve - Microtask' - микрозадачи выполняются после текущего синхронного кода, перед следующей макрозадачей.
4. 'setTimeout - Macrotask' - макрозадачи выполняются после того, как стек вызовов и очередь микрозадач пусты.
*/
