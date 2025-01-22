require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('node:path');
const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let surveyData = []; // Объявляем массив surveyData здесь

app.post('/send-telegram', async (req, res) => {
    const { name, attending, alcoholMessage, comments } = req.body;
    surveyData.push({ name, attending, alcoholMessage, comments });
    res.json({ success: true });
});

app.post('/download', (req, res) => {
    console.log(req);
    console.log(req.body);
    const password = req.body.password;
    if (password) {
        if (password === '10082008') {
            const csv = convertToCSV(surveyData);
            res.setHeader('Content-disposition', 'attachment; filename=survey_data.csv');
            res.setHeader('Content-type', 'text/csv');
            res.end(csv);
        } else {
            res.status(401).send('Кто просил сюда лезть?');
        }
    } else {
        res.status(400).send('Введи пароль');
    }
});

app.get('/download', (req, res) => {
    res.send(`
        <form method="post" action="/download">
            <label for="password">Введите пароль:</label>
            <input type="password" id="password" name="password" required autocomplete="off"><br><br>
            <button type="submit">Выгрузить данные</button>
        </form>
    `);
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

function convertToCSV(data) {
    const headers = Object.keys(data[0] || {name: "", attending: "", alcoholMessage: "", comments: ""});
    const rows = data.map(obj => headers.map(header => obj[header] || "").join(','));
    return [headers.join(','), ...rows].join('\n');
}
