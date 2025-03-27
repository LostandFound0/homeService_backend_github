const messageTable=require('../db/models/messagetable')
const orderTable=require('../db/models/ordertable')
const userDetails=require('../db/models/usertable')
const serviceDetails=require('../db/models/servicedetailstable')
const profileImage=require('../db/models/profileimage')

const messagePost=async(req,res)=>{
    try{
        userID=req.user.id;
        const{orderID,message}=req.body;
        if(!userID){
            return res.status(401).json({
                message:"User Id no Found"
            })
        }

        const messagePost=await messageTable.create({
            userID:userID,
            orderID,
            message
        })
        if(messagePost){
            return res.status(200).json({
                message:"message Send"
            })
        }
    }catch (error) {
        console.error('Message error:', error);
        res.status(500).json({
            message: `${error}`
        });
    }
}

const getMessages=async(req,res)=>{
    try{
        userID=req.user.id
        orderID=req.params.id
       
        const resMessage=await messageTable.findAll({
            where:{
                orderID:orderID
            }
        })

        const getUserID=resMessage.map(msgUserID=>msgUserID.userID)
        const getUserDetailNAme=await userDetails.findAll({
            where:{
                id:getUserID
            }
        })

        const profileIma=await profileImage.findAll({
            where:{
                userId:getUserID
            }
        })

        if(resMessage){
            res.status(200).json({
                data:resMessage,
                User:getUserDetailNAme,
                ProfileImg:profileIma
            })
        }
    }catch (error) {
        console.error('Message error:', error);
        res.status(500).json({
            message: `${error}`
        });
    }
}
module.exports={messagePost,getMessages}