const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const port = 4002;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} 🌈🌈🌈`); //eslint-disable-line no-console
});