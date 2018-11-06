const express = require('express');
const helmet = require('helmet');
const PORT = process.env.PORT || 4242;
const cors = require('cors');
const usersRoutes = require('./database/users/usersRoutes');
// const { Client } = require('pg');
// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

const server = express();

server.use(express.json(), cors(), helmet());

server.get('/', (req, res) => {
  res.send('Hello friend');
});

server.use('/api/recipes', usersRoutes);

server.listen(PORT, () => console.log(`API running on ${PORT}`));
