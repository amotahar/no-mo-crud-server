const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res, next) => {
  res.send('Hello CRUD!');
})

app.listen(port, () => {
  console.log('Listening on port ${port}');
});