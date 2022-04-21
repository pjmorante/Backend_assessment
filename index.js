const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const app = express();

dbConnection();

app.use(cors());

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log(`Server running on Port ${ process.env.PORT }`);
})