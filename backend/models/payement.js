const mongoose = require('mongoose');

const payementDetails = mongoose.Schema({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    email:{
        type:String,
        ref: "Users",
        required: true
    },
    payementId:{
        type: String,
        required: true
    },
    batche:{
        type: String,
        required: true
    },
    payementAt:{
        type: Date,
        default: Date.now()
    },
    isPayementVerified:{
        type : Boolean,
        required: true,
        default: false
    }
});

const Payement = new mongoose.model('Payement',payementDetails);
module.exports = Payement;