function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/users') {
        resolve([
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' },
        ]);
      } else if (url.startsWith('https://api.example.com/users/')) {
        const userId = parseInt(url.split('/').pop(), 10);
        if (userId === 1) {
          resolve({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
        } else {
          reject(new Error('User not found'));
        }
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 2000);
  });
}

fetchData('https://api.example.com/users')
  .then(users => {
    console.log('Users:', users);
    const firstUser = users[0];
    return fetchData(`https://api.example.com/users/${firstUser.id}`);
  })
  .then(user => {
    console.log('First user:', user);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
