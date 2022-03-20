const mongoose=require('mongoose');
const TaskSachema=new mongoose.Schema({
   name:{
      //validations
      type:String,
      required:[true,'must provide a name'],
      trim:true,
      maxlength:[20,'name can not be more than 20 characters']
   },
   completed:{
      type:Boolean,
      default:false
   }
})
//model

module.exports=mongoose.model('Task',TaskSachema)