//console.log('Task Manager App')
const express=require('express')
const app=express()
const tasks=require('./routes/tasks')
const connectDB=require('./db/connect')
require('dotenv').config()
const notFound=require('./middleware/not-found')
const errorHandleMiddleware=require('./middleware/error-handler')


//middleware
//we can just import the sttatic files
app.use(express.static('./public'))
app.use(express.json())//we get value in req.body

//routes
//app.get('/hello',(req,res)=>{
//   res.send('Task Manager App')
//})
app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandleMiddleware)

const port=process.env.PORT || 3000
const start=async()=>{
   try{
      await connectDB(process.env.MONGO_URI)
      app.listen(port,console.log(`Serever is listening on port ${port}...`))
   }catch(error){
      console.log(error)
   }
}
start()
// .env file is to hide the password and thingss about databse as we donot wish to push that
