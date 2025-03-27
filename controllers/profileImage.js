const path = require('path');
const profileDatabase=require('../db/models/profileimage')

const profileImage=async(req,res)=>{
    try{
        const userID=req.user.id;
        const file=req.file
        if(!userID){
            return res.status(401).json({
                message:'token not found'
            })
        }
        if(!file){
            return res.status(401).json({
                message:'no file profile'
            })
        }
        pathdir=file.filename;
        const ress= await profileDatabase.create(
            {
                userId:userID,
                profileImage:pathdir
            }
        )
        if(ress){
            res.status(200).json({
                message:'successs'
            })
        }
    }catch(error){
        return res.status(500).json({
            message: `${error}`
        })
    }
}

const getProfileImage=async(req,res)=>{
    try{
        const userId=req.user.id

        const alld=await profileDatabase.findAll({
            where:{
                userId:userId
            }
        })
        if(alld){
            return res.status(200).json({
                data:alld
            })
        }
    }catch(error){
        return res.status(500).json({
            message: `${error}`
        })
    }
}
module.exports={profileImage,getProfileImage}