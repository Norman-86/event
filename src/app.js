const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const db = require('./database/db');

const axios = require('axios');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const { seedAdmin } = require('./seeders/admin');
// console.log(seedAdmin())
// set up express to pick req.body
app.use(express.json());
//require routes
app.use(eventRoutes);
app.use('/auth', authRoutes);
// setup database
db();

//setting up port
app.listen(port, () => console.log(`Server Listening on Port ${port}`));
