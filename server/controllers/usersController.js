
const bcrypt = require('bcrypt')
const Users = require('../models/chatUser')
exports.register = async (req,res,next) =>{
    const {username,email,password} = req.body

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password,salt)
    const user = await Users.create({
        username:username,
        email:email,
        password:hashPassword,
    })
    return res.json({status:true,user})
}

exports.login = async(req,res,next) =>{
    const {email,password} = req.body 
    const user = await Users.findOne({email})
    const match = await bcrypt.compare(password,user.password)
    if(!match) return res.json({msg:"Wrong password" ,status :false})
    if(!user) return res.json({msg:"Incorrect email" ,status:false})
    return res.json({status:true,user})

}

exports.setAvatar = async(req,res,next) =>{
    try{
        const userId = req.params.id 
        const avatarImage = req.body.image 
        const user = await Users.findByIdAndUpdate(userId,{isAvatarImage:true,avatarImage:avatarImage})
        return res.json({status:true,isSet:user.isAvatarImage,image:user.avatarImage})

    }catch(error){
        return res.json({status:false,error})
    }
}

exports.getAllUsers = async(req,res,next) =>{
    try{
        //find all Id but not select current Id
        const users = await Users.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ])

        return res.json({data:users})
    }catch(ex){
        next(ex)
    }
}