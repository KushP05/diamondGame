const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve('./dist')));
app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(5555);
