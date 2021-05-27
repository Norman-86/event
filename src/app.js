const express = require('express');
const app = express();
const db = require('./database/db')
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
//set up express to pick req.body
app.use(express.json());
//require routes
app.use(eventRoutes);
app.use('/auth', authRoutes);
// setup database
db();

//setting up port
app.listen(3000, () => console.log('Server Listening on Port 3000'))
