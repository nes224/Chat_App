const Users = require("../models/chatUser")

exports.duplicateUser = async(req,res,next)=>{
    console.log(req.body)
    await Users.findOne({
        where:{
            username:req.body.username
        }
    }).then(user=>{
        if(user){
            return res.json({msg:"Username already used", status:false})
        }
        Users.findOne({
            where:{
                email:req.body.email
            }
        }).then(user=>{
            if(user){
                return res.json({msg:"Email already used", status:false})
            }
            next()
        })
    })
}