const express = require('express');
const app = express();
const db = require('./database/db')
const eventRoutes = require('./routes/eventRoutes')
app.use(express.json());
app.use(eventRoutes);
db();

//setting up port
app.listen(3000, () => console.log('Server Listening on Port 3000'))
