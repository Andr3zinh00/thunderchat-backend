const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        required:'Chat is Required!',
        ref:"Chat"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:'user is Required!',
        ref:'User'
    },
    message:{
        type:String,
        required:'Message is Required'
    }
},{
    timestamps:true
});

module.exports=mongoose.model('Messages',messageSchema);