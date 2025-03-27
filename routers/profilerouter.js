const router=require('express').Router()
const { authenticateToken } = require('../middleware/authToken')
const {profileImage,getProfileImage}=require('../controllers/profileImage')
const multer=require('multer')
const fs=require('fs')
const dirPath='uploads/profile'

if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath,{recursive:true})
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,dirPath)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})

const upload=multer({storage:storage})
router.route('/profileImage').post(authenticateToken,upload.single('file'),profileImage)
router.route('/getallimages').get(authenticateToken,getProfileImage)

module.exports=router