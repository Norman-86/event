const mongoose = require('mongoose');
const { schema } = mongoose;

//define a user schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        createIndex: true,
        lowerCase: true
    },
    email: {
        type: String,
        required: true,
        createIndex: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['regular', 'admin'],
        default: 'regular'
    }
});
// export the model
module.exports = mongoose.model('User', userSchema);