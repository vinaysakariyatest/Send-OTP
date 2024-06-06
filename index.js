const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
dotenv.config({ path: './.env'})
require('./db/conn')

app.use(express.json());
const user = require('./routes/user')

app.use('/users',user)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log(`Server is running at PORT Number: ${PORT}`)
})