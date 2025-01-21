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
// ...
});

app.post('/download', (req, res) => {
// ...
});

app.get('/download', (req, res) => {
  // ...
});


app.listen(port, () => {
   console.log(`Сервер запущен на порту ${port}`);
});
