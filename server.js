 // server.js (Node.js)
  require('dotenv').config()
  const express = require('express');
  const bodyParser = require('body-parser');
const fetch = require('node-fetch');

  const app = express();
  const port = 3000;
  app.use(bodyParser.json()); // Парсер json

  const TELEGRAM_BOT_TOKEN = process.env.7331594819:AAFblH3zQz3hBlqzbHJBXzEgTq0XGzNKXz0; // токен вашего бота
  const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_IDS.split('6523984596,1995401121'); // id получателя

  app.post('/send-telegram', async (req, res) => {
      const { name, attending, alcoholMessage, comments } = req.body;

      const message = `Новый ответ на анкету!\nИмя: ${name}\nБудет присутствовать: ${attending}\nПредпочтения в алкоголе: ${alcoholMessage}\nКомментарии: ${comments}`;

    try{
            const apiUrl = `https://api.telegram.org/bot${7331594819:AAFblH3zQz3hBlqzbHJBXzEgTq0XGzNKXz0}/sendMessage`;

      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             chat_id: TELEGRAM_CHAT_ID,
              text: message,
          }),
      });
           
        if(!response.ok){
          throw new Error(`Ошибка отправки сообщения: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

       if(data.ok){
         res.json({ success: true});
       }
       else{
          throw new Error(`Ошибка отправки сообщения: ${data.description}`);
       }
    }
    catch (error) {
           console.error('Ошибка отправки:', error);
         res.status(500).json({ success: false, error: 'Ошибка отправки' });
      }
   });

  app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
  });