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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUsers() {
  try {
    console.log('Fetching users...');
    const users = await fetchData('https://api.example.com/users');
    console.log('Users:', users);

    await delay(1000); // Задержка в 1 секунду

    const firstUser = users[0];
    console.log(`Fetching data for user ${firstUser.id}...`);
    const user = await fetchData(`https://api.example.com/users/${firstUser.id}`);
    console.log('First user:', user);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchUsers();
