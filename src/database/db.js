//import mongoose & connect to MongoDB
const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/eventManagement'
module.exports = function () {
    mongoose.connect(connectionString, {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
    }, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Database Connection Successful')
        }
    });
}
