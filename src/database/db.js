//import mongoose & connect to MongoDB
const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://the-park:vision2030@cluster0.6ph19.mongodb.net/eventManagement?retryWrites=true&w=majority'
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