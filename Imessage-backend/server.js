 //import
import express from "express"
import mongoose from 'mongoose'
import cors from "cors"
import pusher from "pusher"
import mongoData from './mongoData.js'

//app config

const app =express();
const port =process.env.PORT || 9000
// middleware
app.use(cors())
app.use(express.json())

 //DB_congig
const mongoURI='mongodb+srv://admin_akashdubey2211:Radha@@9149@cluster0.3wqdc.mongodb.net/I-message-live?retryWrites=true&w=majority'
mongoose.connect(mongoURI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.once('open',()=>{
console.log('DB connected successfully!');
})

 //Api-routes
 app.post ('/new/conversation', (req,res)=>{
     const dbData=req.body
     mongoData.create(dbData,(err,data)=>{
         if(err){
             res.status(500).send(err)
         }else{
             res.status(201).send(data)
         }
     })
 })

 app.post('/new/message',(req,res)=>{
     mongoData.update(
         {_id: req.query.id},
         {
             $push:{conversation:req.body}
         },
         (err,data)=>{
             if (err) {
                 console.log('error are showing');
                 console.log(err);
                 res.status(500).send(err);
             }else{
                 res.status(201).send(data);
             }
         }

     )
 })

app.get('/get/conversationList',(req,res)=>{
    mongoData.find((err,data) => { 
        if (err) {
            res.status(500).send(err)
        }else{
            data.sort((b,a)=>{
                return a.timestamp - b.timestamp;
            });
            let conversations =[]
            data.map((conversationData)=>{
                const conversationInfo ={
                    id: conversationData._id,
                    name: conversationData.chatName,
                 // timestamp: conversationData.conversation[0].timestamp
                }
                conversations.push(conversationInfo)
            })
            res.status(200).send(conversations)
        }
    })
})
app.get('/get/conversation',(req,res)=>{
    const id =req.query.id
    mongoData.find({_id:id},(err,data)=>{
        if (err) {
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})
app.get ('/get/lastMessage',(req,res)=>{
    const id =req.query.id
    mongoData.find({_id:id},(err, data)=>{
        if (err) {
            res.status(500).send(err)
            
        }else{
            let convData=data[0].conversation
            convData.sort((b,a)=>{
                return  a.timestamp -b.timestamp;
            });
            res.status(200).send(convData[0]);
        }
    })
})
 //listen
 app.listen(port,()=>console.log(`listing on localhost :${port}`));