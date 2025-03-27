const { Signup, Login, Profile,UpdateProfile,Forgotpassword,Updatepassword } = require('../controllers/authControllers')
const { authenticateToken } = require('../middleware/authToken')
const router=require('express').Router()

router.route('/signup').post(Signup)
router.route('/login').post(Login)
router.route('/forgotpassword').post(Forgotpassword)
router.route('/updatepassword').put(Updatepassword)
router.route('/profile').get(authenticateToken,Profile)
router.route('/profileupdate').put(authenticateToken,UpdateProfile)

module.exports = router