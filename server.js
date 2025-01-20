require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
const fs = require('node:fs');
const path = require('node:path');
// Данные опроса (хранятся в памяти, для простого примера)
let surveyData = [];

// Маршрут для отправки данных опроса
app.post('/send-telegram', async (req, res) => {
    const { name, attending, alcoholMessage, comments } = req.body;

    const message = `Новый ответ на анкету!\nИмя: ${name}\nБудет присутствовать: ${attending}\nПредпочтения в алкоголе: ${alcoholMessage}\nКомментарии: ${comments}`;
    surveyData.push({ name, attending, alcoholMessage, comments }); // Добавляем данные в массив

    try {
        // ... (код отправки в Telegram, как в предыдущем примере) ...
        res.json({ success: true });
    } catch (error) {
        console.error('Ошибка отправки:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Маршрут для выгрузки базы данных
app.post('/download', (req, res) => {
    const password = req.body.password;
    if (password === '057057') {
        const csv = surveyData.map(item => `${item.name},${item.attending},${item.alcoholMessage},${item.comments}`).join('\n');
        res.setHeader('Content-disposition', 'attachment; filename=survey_data.csv');
        res.setHeader('Content-type', 'text/csv');
        res.end(csv);
    } else {
        res.status(401).send('Неверный пароль');
    }
});

// Маршрут для страницы с формой ввода пароля
app.get('/download', (req, res) => {
    res.send(`
      <form method="post" action="/download">
        <label for="password">Введите пароль:</label>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit">Выгрузить данные</button>
      </form>
    `);
});


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
