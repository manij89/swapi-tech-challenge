require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, './client/build');

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 4002;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} 🌈🌈🌈`); //eslint-disable-line no-console
});