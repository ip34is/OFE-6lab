const apiUrl = 'https://randomuser.me/api/?results=5';

const userContainer = document.getElementById('user-container');
const loadingMessage = document.getElementById('loading-message');

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            // перевірка на успішність запиту
            throw new Error('Помилка мережі: ' + response.status);
        }
        // перетворення в js об'єкт
        return response.json();
    })
    .then(data => {
        loadingMessage.style.display = 'none';

        const users = data.results;

        users.forEach(user => {
            // ось тут я витягую потрібні мені дані (варіант 16)
            const picture = user.picture.large;
            const name = `${user.name.first} ${user.name.last}`;
            const email = user.email;
            const phone = user.phone;
            const city = user.location.city;

            const userCardHTML = `
                        <div class="user-card">
                            <img src="${picture}" alt="Фото користувача ${name}">
                            <div class="name">${name}</div>
                            <div class="info">📧 ${email}</div>
                            <div class="info">📞 ${phone}</div>
                            <div class="info">🏙️ ${city}</div>
                        </div>
                    `;

            userContainer.innerHTML += userCardHTML;
        });
    })
    .catch(error => {
        console.error('Не вдалося отримати дані:', error);
        loadingMessage.textContent = 'Виникла помилка при завантаженні даних. Спробуйте оновити сторінку.';
    });