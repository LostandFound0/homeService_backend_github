require('dotenv').config()
const serviceDatabase = require('../db/models/servicedetailstable')
const jwt = require('jsonwebtoken')

const addService = async (req, res) => {
    try {
        const userId = req.user.id;
        const { serviceName, minPrice, maxPrice, serviceDescription, aboutuserDescription, diffServices, qualification } = req.body;

        if (!serviceName, !minPrice, !maxPrice, !serviceDescription, !aboutuserDescription, !diffServices, !qualification) {
            return res.status(400).json({
                message: "fields not included"
            })
        }

        const addserviceInfo = await serviceDatabase.create({
            serviceName,
            minPrice,
            maxPrice,
            serviceDescription,
            aboutuserDescription,
            diffServices,
            qualification,
            user_id: userId
        })

        if (addserviceInfo) {
            return res.status(200).json({
                message: addserviceInfo
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

const getService = async (req, res) => {
    try {
        const userId = req.user.id;
        const getaddressDetails=await serviceDatabase.findAll({
            where:{user_id:userId}
        })

        if(getaddressDetails){
            res.status(200).json({
                message:getaddressDetails
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

const updateService=async(req,res)=>{
    try{
        const userId = req.user.id;
        const paramid= req.params.id;
        if(!paramid){
            return res.status(400).json({
                message:'parameters not there'
            })
        }

        const{id,...updateservicedetails}=req.body;

        const updateServiceinfo=await serviceDatabase.update(updateservicedetails,{
            where:{id:paramid,user_id:userId}
        })
        if(updateServiceinfo){
            res.status(200).json({
                message:updateservicedetails
            })
        }
    }catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

const deleteService=async(req,res)=>{
    try{
        const userId = req.user.id;
        const serviceparamid=req.params.id;

        const deleteserviceInfo=await serviceDatabase.destroy({
            where:{
                id:serviceparamid,
                user_id:userId
            }
        })

        if(deleteserviceInfo){
            res.status(200).json({
                message:"Delete Successfully"
            })
        }
    }catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

const getallServiceData= async(req,res)=>{
    try{
        const getalldata=await serviceDatabase.findAll()

        if(getalldata.length>0){
            res.status(200).json({
                message:getalldata
            })
        }else{
            return res.status(401).json({
                message:"No data"
            })
        }

    }catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}
module.exports = { addService,getService,updateService,deleteService,getallServiceData }