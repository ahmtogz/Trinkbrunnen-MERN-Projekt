const mongoose = require('mongoose');

const LocSchema = new mongoose.Schema({
    titel:{type: String, required: true},
    address:{type: String, required: true},
    postCode:{type:String, required: true},
    city:{type: String, required: true}
})

module.exports = mongoose.model('Location',LocSchema)