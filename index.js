//File นี้ Build ขึ้นมาเป็น Docker // Anavit.ko
const express = require('express')
const mongoose = require('mongoose')
// const res = require('express/lib/response')
// ดึงตัว ENV ชื่อ PORT เพื่อให้ docker build run env ลงไปได้
const port = process.env.PORT || 3000

// connect database ดึงตาม connection mongoose url env.mongoose และ env port 
mongoose.connect(process.env.MONGODB_URL)


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String

}) 

// mongoose.model function node.js มี model ชื่อ User 
//  asynchronous  = async
const User = mongoose.model('User', userSchema)

const app = express()
// APP สามารถรับ json มาได้ และ post ไปยังหน้าตัว users ที่มี request และ respon
app.use(express.json())

app.get('/version', (req,res) => res.send('1.0.2'))

// Routing02 function ดึงข้อมูลมาทั้งหมดโดยใช้คำสั่ง find จะดึงมาทั้งหมด
app.get('/users', async (req, res) => {
    const users = await User.find()
    //จะ send ข้อมูล users ลงไป
    res.send(users)
})
//  API && Routing01 request && respon
app.post ('/users', async (req, res) =>{
    //created req.body ที่ได้รับมา
    await User.create(req.body)
    // respon 201 ข้อมูลได้รับการสร้าง
    res.sendStatus(201)

})

app.listen(port, () => console.log ('App listening on ${port}'))