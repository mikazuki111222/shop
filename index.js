const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const userRout = require('./routes/user')
const authRouth= require('./routes/auth')


dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=> console.log('DB is connected'))
    .catch((err)=>{
        console.log(err)
    })

app.use(express.json());
app.use('/api',userRout,authRouth);
app.get('/thinhbeovch',(req,res)=>{
    res.send('thinhbeovch')
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen( process.env.PORT, () => console.log(`Example app listening on port ${ process.env.PORT}!`))