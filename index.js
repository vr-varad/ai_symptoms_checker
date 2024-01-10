const express = require('express')
const app = express()
const run = require('./symplomChecker')
const dotenv = require('dotenv')
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config()
const port = process.env.port

app.get('/',((req,res)=>{
    res.json({
        msg: '/ route'
    })
}))

app.post('/api/v1/symptomChecker',async (req,res)=>{
    try {
        const data = req.body
        const result = await run(data)
        return res.status(200).json({
            message:'Success',
            result
        })
    } catch (error) {
        return res.status(500).json({
            message:'Error',
            error
         })
    }
})

app.listen(port,'0.0.0.0',()=>{
    console.log('Server Started at',port)
})