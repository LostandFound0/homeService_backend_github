const {addService,getService,updateService,deleteService,getallServiceData}=require('../controllers/serviceProfile')
const { authenticateToken } = require('../middleware/authToken')
const router=require('express').Router()

router.route('/addservice').post(authenticateToken,addService)
router.route('/getservice').get(authenticateToken,getService)
router.route('/updservice/:id').put(authenticateToken,updateService)
router.route('/deleteservice/:id').delete(authenticateToken,deleteService)
router.route('/getallServiceData').get(authenticateToken,getallServiceData)

module.exports=router;