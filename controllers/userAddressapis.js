const AddressDatabase = require('../db/models/address_table')
const UserDatabase = require('../db/models/usertable')
const Allservices=require('../db/models/servicedetailstable')

const addUserAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address, city, state, postal_code } = req.body;
        if (!address, !city, !state, !postal_code) {
            return res.status(400).json({
                message: 'please fill all fields'
            })
        }

        const createAddress = await AddressDatabase.create({
            address,
            city,
            state,
            postal_code,
            user_id:userId
        })

        if (createAddress) {
            res.status(200).json({
                message: "Adding address success"
            })
        } else {
            res.status(500).json({
                message: 'Failed to add address.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

const getUserAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const getDetails = await AddressDatabase.findAll({
            where: { user_id: userId }
        })

        res.status(200).json({
            message: "get address",
            data:getDetails
        })
    } catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}


const updateAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address, city, state, postal_code } = req.body;
        const addressId = req.params.id;
        const upAddress = {}
        if (address) upAddress.address = address;
        if (city) upAddress.city = city;
        if (state) upAddress.state = state;
        if (postal_code) upAddress.postal_code = postal_code;

        const [updaAddrss] = await AddressDatabase.update(upAddress, {
            where: {
                id: addressId,
                user_id: userId
            }
        })
        if (updaAddrss === 0) {
            return res.status(404).json({
                message: "Address not found or not authorized to update."
            });
        }

        res.status(200).json({
            message: "Address updated successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

const deleteAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;
        if (!addressId) {
            return res.status(400).json({
                message: "Address ID is required."
            });
        }
        const delAddress = await AddressDatabase.destroy({
            where: {
                id: addressId,
                user_id: userId
            }
        })
        if (delAddress === 0) {
            return res.status(404).json({
                message: "Address not found or not authorized to update."
            });
        }

        res.status(200).json({
            message: "Address Deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

const alldetailsuser=async(req,res)=>{
    try{
        getparamId=req.params.id;
        const userId = req.user.id;
        if (!getparamId) {
            return res.status(400).json({
                message: "Address ID is required."
            });
        }

        const getUser=await UserDatabase.findOne({
            where:{id:getparamId}
        })
        const getaddress=await AddressDatabase.findAll({
            where:{user_id:getparamId}
        })
        const services=await Allservices.findAll({
            where:{user_id:getparamId}
        })
        res.status(200).json({
            getUser,
            getaddress,
            services
        })
    }catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

module.exports = { addUserAddress, getUserAddress, updateAddress, deleteAddress, alldetailsuser}