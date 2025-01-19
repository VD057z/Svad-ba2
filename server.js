require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // токен вашего бота
const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_IDS ? process.env.TELEGRAM_CHAT_IDS.split(',') : []; // Идентификаторы получателей

app.post('/send-telegram', async (req, res) => {
    const { name, attending, alcoholMessage, comments } = req.body;
   
    const message = `Новый ответ на анкету!\nИмя: ${name}\nБудет присутствовать: ${attending}\nПредпочтения в алкоголе: ${alcoholMessage}\nКомментарии: ${comments}`;

    try {
        // Динамический импорт node-fetch
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

        for (const chatId of TELEGRAM_CHAT_IDS) {
             const apiUrl = `https://api.telegram.org/bot${AAFblH3zQz3hBlqzbHJBXzEgTq0XGzNKXz0}/sendMessage`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   chat_id: chatId.trim(),
                    text: message,
                }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка отправки сообщения: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            if(!data.ok){
             throw new Error(`Ошибка отправки сообщения: ${data.description}`);
         }
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Ошибка отправки:', error);
        res.status(500).json({ success: false, error: 'Ошибка отправки' });
    }
});


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
  app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
  });
