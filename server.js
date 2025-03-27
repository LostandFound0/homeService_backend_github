require('dotenv').config()
const express=require('express')
const bcrypt = require('bcrypt')
const cors=require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const authrouter=require('./routers/authrouter')
const userRouter=require('./routers/userrouters')
const workerRouter=require('./routers/serviceRouters')
const orderRouters=require('./routers/orderRouters')
const profilerouter=require('./routers/profilerouter')
const subcriptionRouter=require('./routers/subscriptionRouters')
const messageRouter=require('./routers/messageRouter')

const port = process.env.APP_PORT || 6060;
const path=require('path')
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use('/uploads/profile', express.static(path.join(__dirname, 'uploads/profile')));
app.use('/files', express.static(path.join(__dirname, 'files')));

const pathDir = process.env.PATH_DIR || '';
app.use(authrouter)
app.use(userRouter)
app.use(workerRouter)
app.use(orderRouters)
app.use(profilerouter)
app.use(subcriptionRouter)
app.use(messageRouter)


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});