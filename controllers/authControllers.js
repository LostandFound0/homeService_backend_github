const bcrypt = require('bcrypt')
const UserDatabase = require('../db/models/usertable')
const salt = 15
const jwt = require('jsonwebtoken')
const nodemailer=require('nodemailer')

const transpoter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'cheeraganesh1995@gmail.com',
        pass:'arrg begf poyg alvn'
    }
})

const Signup = async (req, res) => {
    try {
        const { firstname, lastname, email, phonenumber, password, usertype } = req.body;

        if (!firstname, !lastname, !email, !phonenumber, !password) {
            return res.json({
                message: "Please fill all fields"
            })
        }
        const existingEmailUser = await UserDatabase.findOne({
            where: { email: email }
        });

        if (existingEmailUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const existingPhoneUser = await UserDatabase.findOne({
            where: { phonenumber: phonenumber }
        });

        if (existingPhoneUser) {
            return res.status(409).json({
                message: "Phone number already exists"
            });
        }
        const bcrypt_password = await bcrypt.hash(password, salt)

        const newUser = await UserDatabase.create({
            firstname,
            lastname,
            email,
            phonenumber,
            password: bcrypt_password,
            usertype: usertype || '0'
        })

        if (newUser) {
            res.status(200).json({
                message: 'success'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email, !password) {
            return res.json({
                message: "Please fill all fields"
            })
        }

        checkUser = await UserDatabase.findOne({
            where: { email }
        })

        if (!checkUser) {
            return res.status(401).json({
                message: "Email or password wrong"
            })
        }

        encryptPAssword = await bcrypt.compare(password, checkUser.password)

        if (!encryptPAssword) {
            return res.status(401).json({
                message: "Email or password wrong"
            })
        }
        console.log(checkUser.usertype)
        const token = await jwt.sign({ id: checkUser.id, usertype:checkUser.usertype }, process.env.SECRET_KEY, ({ expiresIn: '1h' }))
        await checkUser.update({ token })

        res.status(200).json({
            message: 'success',
            token:token
        })

    } catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}


const Forgotpassword= async(req,res)=>{
    try{
        const{email}=req.body;
        const checkuser= await UserDatabase.findOne({
            where:{email}
        })
        if(!checkuser){
            return res.status(401).json(
                {
                    message:"Email not found"
                }
            )
        }else{
            const createUpdatetoken= jwt.sign({id:checkuser.id},process.env.SECRET_KEY,{expiresIn:'5m'})
            await checkuser.update({ updatetoken:createUpdatetoken },{id:checkuser.id})
            
            const mailOption={
                from:'cheeraganesh1995@gmail.com',
                to:email,
                subject:"Password Reset Request",
                text:`http://localhost:5173/upassword/${createUpdatetoken}`,
            }
            
            await transpoter.sendMail(mailOption)
            return res.json(
                {
                    message:`http://localhost:5173/upassword/${createUpdatetoken}`
                }
            )
            
        }
    }catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

const Updatepassword=async(req,res)=>{
    try{
        const token=req.headers.authorization?.split(' ')[1]
        if(!token){
            return res.status(404).json({
                message:'Token not found or Expired'
            })
        }
        
        const decode=jwt.verify(token,process.env.SECRET_KEY);

        if(!decode||!decode.id){
            return res.status(404).json({
                message:'User not found'
            })
        }

        const {password}=req.body;
        const update_password={}
        if(password) update_password.password=await bcrypt.hash(password,salt);
        const updateUserpassword= await UserDatabase.update(update_password,{
            where:{id:decode.id}
        })

        if(updateUserpassword){
            res.status(200).json({
                message:"password updated sucessfully"
            })
        }
    }catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

const Profile = async (req, res) => {
    try {
        const userId=req.user.id;
       
        const getDetails=await UserDatabase.findOne({
            where:{id:userId}
        })
        
        res.status(200).json({
            message:getDetails
        })
    } catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

const UpdateProfile = async (req,res)=>{
    try{
        const userId=req.user.id;

        const {firstname,lastname,email,phonenumber}=req.body;
        if(!firstname,!lastname,!email,!phonenumber){
            return res.json({
                message: "Please fill all fields"
            })
        }

        const exitsUser=await UserDatabase.findOne({
            where:{
                id:userId
            }
        })

        if(email!==exitsUser.email){
            const existsemail=await UserDatabase.findOne({
                where:{
                    email:email
                }
            }) 
            if (existsemail) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }

        }
        
        if(phonenumber!==exitsUser.phonenumber){
            const existsphoneNumber=await UserDatabase.findOne({
                where:{
                    phonenumber:phonenumber
                }
            })
            if(existsphoneNumber){
                return res.status(409).json({
                    message: "Phonenumber already exists"
                })
            }
    
        }
         const update_values={}
        if(firstname) update_values.firstname=firstname
        if(lastname) update_values.lastname=lastname
        if(email) update_values.email=email
        if(phonenumber) update_values.phonenumber=phonenumber

        const[rowupdates]=await UserDatabase.update(update_values,{where:{id:userId}})
        if(!rowupdates){
            return res.json({
                message: "PRoblem in update "
            })
        }

        res.status(200).json({
            message:"Sucessfully updated"
        })
    }
    catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}


module.exports = { Signup, Login, Profile,UpdateProfile,Forgotpassword,Updatepassword }