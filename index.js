const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const signupRoot = require('./routers/signupRouter')
const weatherRouter = require('./routers/weatherRouter')
const app = express()
const port = 4000

app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(cors())
app.use('/', signupRoot)
app.use('/', weatherRouter)
try{
    mongoose.connect('mongodb+srv://chetelise:123123123@cluster0.tgrihz5.mongodb.net/')
    console.log('Connected to MongoDB')
}
catch(err){
    console.log(err)
}
app.get('/', (req, res) =>{
    res.send('Welcome to backend API Working')

})




app.listen(port, ()=>{
    console.log(`Port ${port} listening !!!!`)

})
