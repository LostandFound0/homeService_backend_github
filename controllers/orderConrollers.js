const userDetails=require('../db/models/usertable')
const serviceDetails=require('../db/models/servicedetailstable')
const orderData=require('../db/models/ordertable')
const paymentData=require('../db/models/paymenttable')
const addressData=require('../db/models/address_table')
const reviewData=require('../db/models/reviewtable')

const orderPost=async(req,res)=>{
    try{
        const userId = req.user.id;
        const {service_id,status,servicemessage,paymentstatus}=req.body;

        if(!service_id){
            return res.status(400).json({
                message:'Please check all fields'
            }
        )}

        const enterData = await orderData.create({
            orderuser_id:userId,
            service_id,
            status,
            servicemessage,
            paymentstatus:paymentstatus||"0"
        })

        if(enterData){
            res.status(200).json({
                message: 'success'
            })
        }
    }catch(error){
        res.status(500).json({
            message: `${error}`
        })
    }
}

const userOrderDetails=async(req,res)=>{
    try{
        const userId = req.user.id;
        console.log(userId)
        const getuserOrderData= await orderData.findAll({
            where:{orderuser_id:userId}
        })
        
        const getOrderUserData= getuserOrderData.map(order=>order.service_id)
        console.log(getOrderUserData)

        const getserviceDetails= await serviceDetails.findAll({
            where:{id:getOrderUserData}
        })

        const getuser_details = getserviceDetails.map(userD=>userD.user_id)
        console.log(getuser_details)

        const getUserWorkerDetails = await userDetails.findAll({
            where:{id:getuser_details}
        })
        
        if(getuserOrderData){
            res.status(200).json({
                message: "Data User Side retrieved successfully",
                orders: getuserOrderData,
                services: getserviceDetails,
                users: getUserWorkerDetails
            });
    
        }
    }catch(error){
        res.status(500).json({
            message: `${error}`
        })
    }
}

const workerOrderDetails=async(req,res)=>{
    try{
        const userID=req.user.id;
        const serviceDetailsaa=await serviceDetails.findAll({
            where:{user_id:userID}
        })
        const getserviceID= serviceDetailsaa.map(serID=>serID.id)
        console.log(getserviceID)

        if(serviceDetails.length<0){
            return res.status(401).json({
                message:'There is no serviceDetails data'
            })
        }

        const workerSerDetails= await orderData.findAll({
            where:{service_id:getserviceID}
        })

        const getUserReqId=workerSerDetails.map(getuID=>getuID.orderuser_id)

        const getWhoWantsRequest=await  userDetails.findAll({
            where:{id:getUserReqId}
        })

        const getUseraddress=await addressData.findAll({
            where:{user_id:getUserReqId}
        })

        
        if(workerSerDetails){
            res.status(200).json({
                message: "Data worker data retrieved successfully",
                orders: workerSerDetails,
                services: serviceDetailsaa,
                userDetailsForRequest:getWhoWantsRequest,
                address:getUseraddress
            });
    
        }
    }catch(error){
        res.status(500).json({
            message: `${error}`
        })
    }
}

const updateOrderDetails=async(req,res)=>{
    try{
        const IdParams=req.params.id
        const{id,service_id,...updateORder}=req.body;
        const upOrder=await orderData.update(updateORder,{
            where:{id:IdParams,service_id:service_id}
        })
        if(upOrder){
            res.status(200).json({
                message: "Data worker data retrieved successfully",
                orders: upOrder
            });
    
        }
    }catch(error){
        res.status(500).json({
            message: `${error}`
        })
    }
}


//payment post method

const orderPaymentmethod=async(req,res)=>{
    try{
        const userID=req.user.id;
        const{orderID,cardName,cardNumber,expMonth,expYear,paymentAmount,
            paymentAddress,paymentCity,paymentState,paymentPostalcode
        }=req.body;

        if(!orderID){
            return res.status(400).json({
                message:"Order not found"
            })
        }

        const paymentDetails=await paymentData.create({
            orderID,
            userId:userID,
            cardName,
            cardNumber,
            expMonth,
            expYear,
            paymentAmount,
            paymentAddress,paymentCity,paymentState,paymentPostalcode
        })

        if(paymentDetails){
            try {
                await orderData.update({
                    paymentstatus: "1"
                }, {
                    where: {
                        id: orderID,
                        orderuser_id:userID
                    }
                });
                res.status(200).json({
                    message: "Payment Success"
                });
            } catch (updateError) {
                console.error('Failed to update userType:', updateError);
                res.status(500).json({
                    message: 'json succeeded, but failed to update userType'
                });
            }
        }
    }catch(error){
        return res.status(500).json({
            message: `${error}`
        })
    }
}


const getPaymentDetails=async(req,res)=>{
    try{
        const userID=req.user.id

        const getPaymentDetails=await paymentData.findAll({
            where:{
                userId:userID
            }
        })

        if(getPaymentDetails){
            res.status(200).json({
                data:getPaymentDetails
            })
        }
    }catch(error){
        return res.status(500).json({
            message: `${error}`
        })
    }
}

const reviewPost=async(req,res)=>{
    try{
        const userID=req.user.id
        const{order_ID, points, comment}=req.body;

        if(!order_ID){
            return res.status(400).json({
                message:"OrderID not found"
            })
        }
        const review=await reviewData.create({
            userID:userID,
            order_ID,
            points,
            comment
        })

        if(review){
            return res.status(200).json({
                message:"Review Success"
            })
        }
    }catch(error){
        return res.status(500).json({
            message: `${error}`
        })
    }
}



module.exports={orderPost,userOrderDetails,workerOrderDetails,
                updateOrderDetails,orderPaymentmethod,
                getPaymentDetails,reviewPost}