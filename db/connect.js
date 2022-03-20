const mongoose=require('mongoose')
//const connectionString=
//'mongodb+srv://Rishab:Rishab@cluster0.5pjj5.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority'
//return a promise
const connectDB=(url)=>{
   return mongoose
   .connect(url,{
      useNewUrlParser:true,
      useCreateIndex:true,
      useFindAndModify:false,
      useUnifiedTopology:true,
   })
}
/*
mongoose
.connect(connectionString,{
   useNewUrlParser:true,
   useCreateIndex:true,
   useFindAndModify:false,
   useUnifiedTopology:true,
})
.then(()=>console.log('Connected to the db..'))
.catch((err)=>console.log(err))
*/
module.exports=connectDB