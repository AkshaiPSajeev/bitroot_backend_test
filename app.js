const express=require('express');
const mongoose=require('mongoose')
const cors=require('cors');
const bodyparser=require('body-parser')
const dotenv=require('dotenv');

const app=express();
app.use(cors());
app.use(bodyparser.json())
dotenv.config();


const indexRouter=require('./routes/index');
app.listen(8081,(req,res)=>{
    console.log('server started');
})

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('mongodb connected');
}).catch(()=>{
    console.log('mongo db connection failed');
})

app.use('/',indexRouter);
