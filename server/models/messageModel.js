const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/ChatApp',{
    useNewUrlParser: true, useUnifiedTopology:true
}).catch(err => console.log(err))


let messageSchema = new mongoose.Schema({
    message:{
        text:{
            type:String, 
            required:true ,
        },
    },
    users:Array,
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
        },
    },
    {
        timestamps:true,
    
    }

)

let Messages = mongoose.model('Messages',messageSchema)
module.exports = Messages
