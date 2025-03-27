const {orderPost,userOrderDetails,workerOrderDetails,updateOrderDetails,orderPaymentmethod,getPaymentDetails,reviewPost}=require('../controllers/orderConrollers')
const { authenticateToken } = require('../middleware/authToken')
const router=require('express').Router()

router.route('/orderpost').post(authenticateToken,orderPost)
router.route('/userorders').get(authenticateToken,userOrderDetails)
router.route('/workorders').get(authenticateToken,workerOrderDetails)
router.route('/updateOrders/:id').put(authenticateToken,updateOrderDetails)
router.route('/paymentorder').post(authenticateToken,orderPaymentmethod)
router.route('/getpaymentorder').get(authenticateToken,getPaymentDetails)
router.route('/reviewpost').post(authenticateToken,reviewPost)
module.exports=router