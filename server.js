require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('node:path');
const app = express();
const port = process.env.PORT || 10000; // Используйте process.env.PORT, для Heroku, Render и т.д.

app.use(bodyParser.json());

// ---
app.use(express.static(path.join(__dirname, './')));
  // Handle GET requests to the root path ("/")
  app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'));
   });
// ---

let surveyData = [];

app.post('/send-telegram', async (req, res) => {
    const { name, attending, alcoholMessage, comments } = req.body;
    surveyData.push({ name, attending, alcoholMessage, comments });
    res.json({ success: true });
});

app.post('/download', (req, res) => {
    console.log(req.body); // Выводим req.body в консоль
    const password = req.body.password;
    if (password) {
        if (password() === '10082008') {
            res.setHeader('Content-disposition', 'attachment; filename=test_data.csv');
            res.setHeader('Content-type', 'text/csv');
            res.end('test,test2,test3\n');
        } else {
           res.status(401).send('Неверный пароль');
        }
    } else {
        res.status(400).send('Поле пароля не заполнено');
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
