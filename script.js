const apiUrl = 'https://randomuser.me/api/?results=5';

const userContainer = document.getElementById('user-container');
const loadingMessage = document.getElementById('loading-message');

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            // Перевірка на успішність запиту
            throw new Error('Помилка мережі: ' + response.status);
        }
        // Перетворення в js об'єкт
        return response.json();
    })
    .then(data => {
        loadingMessage.style.display = 'none';

        const users = data.results;

        users.forEach(user => {
            // Ось тут я витягую потрібні мені дані
            const picture = user.picture.large;
            const name = `${user.name.first} ${user.name.last}`;
            const phone = user.phone;
            const city = user.location.city;

            const postcode = user.location.postcode;

            const userCardHTML = `
                <div class="user-card">
                    <img src="${picture}" alt="Фото користувача ${name}">
                    <div class="name">${name}</div>
                    <div class="info">🏙️ ${city}</div>
                    <div class="info">📧 ${postcode}</div>
                    <div class="info">📞 ${phone}</div>
                </div>
            `;

            userContainer.innerHTML += userCardHTML;
        });
    })
    .catch(error => {
        console.error('Не вдалося отримати дані:', error);
        loadingMessage.textContent = 'Виникла помилка при завантаженні даних. Спробуйте оновити сторінку.';
    });