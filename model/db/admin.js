const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    phone: {
        type: String, required: [true, "NIC is required."],
        validate: {
            validator: function (v) {
                return /^\d{11}$/.test(v);
            },
            message: `Enter a valid Number!`
        }
    },
    role: {
        type: String,
        default: 'admin',
    },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
