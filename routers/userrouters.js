const {addUserAddress,getUserAddress,updateAddress,deleteAddress,alldetailsuser} = require('../controllers/userAddressapis')
const { authenticateToken } = require('../middleware/authToken')
const router=require('express').Router()

router.route('/addaddress').post(authenticateToken,addUserAddress)
router.route('/getaddress').get(authenticateToken,getUserAddress)
router.route('/updateaddress/:id').put(authenticateToken,updateAddress)
router.route('/deletaddress/:id').delete(authenticateToken,deleteAddress)
router.route('/alld/:id').get(authenticateToken,alldetailsuser)
module.exports=router;