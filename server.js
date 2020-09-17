import Messages from './dbMessages.js'
import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import cors from 'cors'


const app = express()
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: '1071913',
    key: '57e8f1a83b10b03d0b8f',
    secret: 'aac9f566c20f78ffb605',
    cluster: 'eu',
    encrypted: true
  });

app.use(express.json());
app.use(cors());

const connection_url =`mongodb+srv://admin:Imtiazahmednibir@404@cluster0.y20ci.mongodb.net/whatsappdb?retryWrites=true&w=majority`

mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection
db.once('open',()=>{
    console.log("DB connected")

    const msgCollection = db.collection('messagecontents')
     const changeStream = msgCollection.watch()

     changeStream.on('change',(change)=>{
         console.log('a change occured', change);

         if(change.operationType === 'insert'){
             const messageDetails = change.fullDocument;
             pusher.trigger('messages','inserted',
             {
                 name : messageDetails.user,
                 message : messageDetails.message,
                 timestamp : messageDetails.timestamp,
                 received : messageDetails.received,
             }
            );
         } else {
             console.log('Error triggering pusher')
         }
     })
})

app.get('/',(req,res)=>res.status(200).send('hello world'))
app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new',(req,res)=>{
    const dbMessage = req.body

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.listen(port,()=>console.log(`Listening on localhost:${port}`));