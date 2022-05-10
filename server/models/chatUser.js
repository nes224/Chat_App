const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/ChatApp',{
    useNewUrlParser: true, useUnifiedTopology:true
}).catch(err => console.log(err))


let UsersSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    isAvatarImage:Boolean,
    avatarImage:String ,
})

let Users = mongoose.model('Users',UsersSchema)
module.exports = Users
