const Task=require('../models/Task')
const asyncWrapper=require('../middleware/async')
const{createCustomError}=require('../errors/custom-error')
/*const getAllTasks=async(req,res)=>{
   try{
   const task=await Task.find({})
   res.status(200).json({task})
   //res.status(200).json({task,amount:task.length})
   //res.status(200)
   //.json({success:true,data:{task,nbHits:task.length}
   //})
   }catch(error)
   {
      res.status(500).json({msg:error})
   }
}*/
const getAllTasks=asyncWrapper(async(req,res)=>{
   const task=await Task.find({})
   res.status(200).json({tasks:task})
})
/*
const createTasks=async(req,res)=>{
   try{
   const task=await Task.create(req.body)
   res.status(201).json({task})
   }catch(error)
   {
      res.status(500).json({msg:error})
   }
}
const getTasks=async(req,res)=>{

   try{
      const{id:taskID}=req.params
      const task=await Task.findOne({_id:taskID})
      if(!task){
         return res.status(404).json({msg: `No task with the id :${taskID}`})
      }
      res.status(200).json({task})
      }catch(error)
      {
         res.status(500).json({msg:error})
      }
      //so what this 2 errors why we have two kin of errors
      //1st type of error is when the size of id is same but value is wrong
      //2nd is when the size is not same
}
const updateTasks=async(req,res)=>{
   try{
      const{id:taskID}=req.params

      const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
         new:true,
         runValidators:true,
      })
      if(!task){
         return res.status(404).json({msg: `No task with the id :${taskID}`})
      }
      res.status(200).json({task})
      }catch(error)
      {
         res.status(500).json({msg:error})
      }
}
const deleteTasks=async(req,res)=>{
   try{
      const{id:taskID}=req.params
      const task=await Task.findOneAndDelete({_id:taskID})
      if(!task){
         return res.status(404).json({msg: `No task with the id :${taskID}`})
      }
      //res.status(200).json({task})
      //res.status(200).send()
      res.status(200).json({task:null,status:'success'})
      }catch(error)
      {
         res.status(500).json({msg:error})
      }
}*/
//how to get rid of these many try and catch we have to make middleware functions

const createTasks=asyncWrapper(async(req,res)=>{
   const task=await Task.create(req.body)
   res.status(201).json({task})
})
const getTasks=asyncWrapper(async(req,res,next)=>{
      const{id:taskID}=req.params
      const task=await Task.findOne({_id:taskID})
      if(!task){
         return next(createCustomError(`No task with the id :${taskID}`,404))
         //const error=new Error('Not found')
         //error.status=404;
         //return next(error)
         ////return res.status(404).json({msg: `No task with the id :${taskID}`})
      }
      res.status(200).json({task})
})
const updateTasks=asyncWrapper(async(req,res)=>{
      const{id:taskID}=req.params
      const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
         new:true,
         runValidators:true,
      })
      if(!task){
         return next(createCustomError(`No task with the id :${taskID}`,404))
         //return res.status(404).json({msg: `No task with the id :${taskID}`})
      }
      res.status(200).json({task})
})
const deleteTasks=asyncWrapper(async(req,res)=>{
      const{id:taskID}=req.params
      const task=await Task.findOneAndDelete({_id:taskID})
      if(!task){
         return next(createCustomError(`No task with the id :${taskID}`,404))
         //return res.status(404).json({msg: `No task with the id :${taskID}`})
      }
      res.status(200).json({task:null,status:'success'})
      
})
module.exports={
   getAllTasks,
   createTasks,
   getTasks,
   updateTasks,
   deleteTasks
}