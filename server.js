const express = require('express');
const axios = require('axios');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;
const API_HOST = process.env.API_HOST;

app.use(express.static('public'));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public', 'index.html'));
  });

app.get('/weather', async (req, res) => {
  const word = req.query.city;

  const url = `https://${API_HOST}/v1/weather?city=${encodeURIComponent(word)}`;
  const headers = {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST
  };

  try {
    const response = await axios.get(url, { headers });
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data from the API' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
