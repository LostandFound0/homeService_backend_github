const {messagePost,getMessages}=require('../controllers/messageController')
const router=require('express').Router()
const { authenticateToken } = require('../middleware/authToken')

router.route('/messagepost').post(authenticateToken,messagePost)
router.route('/getmessages/:id').get(authenticateToken,getMessages)

module.exports=router
