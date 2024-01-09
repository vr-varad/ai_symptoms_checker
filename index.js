const express = require('express')
const app = express()
const run = require('./symplomChecker')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.port
app.use(express.json())

app.post('api/v1/symptomChecker',async (req,res)=>{
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

app.listen(port,()=>{
    console.log('Server Started at',port)
})