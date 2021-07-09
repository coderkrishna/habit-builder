const habitSchema = require("../models/habitSchema")

//POST
const addHabit = async (req,res,next) => {
    
    const habit = new habitSchema({
        name : req.body.name,
        time  : req.body.time,
        frequency : req.body.frequency
    })

    const result = await habit.save()

    if(result){
        return res.json({
            "message" : "new habit added sucessfully",
            "success" : true
        })
    }else{
        return res.json({
            "message" : "something went wrong",
            "success" : false 
        })
    }
}

//GET
const getHabits = async (req,res,next) => {
   
    let habits = await habitSchema.find()
    
    if(habits){
        return res.json({
            "Habits" : habits,
            "success" : true
        })
    }else{
        return res.json({
            "message" : "something went wrong",
            "success" : false
        })
    }
}

//PUT
const updateHabit = async (req,res,next) => {
    let updatedHabit = await habitSchema.updateOne({_id : req.params.id},
        {
            $set :{
                name : req.body.name,
                time : req.body.time,
                frequency : req.body.frequency,
            }
        })
    if(!updatedHabit){
        return res.json({
            "message" : "error",
            "success" : false
        })
    }
    return res.json({
        "message" : "habit updated succesfully",
        "success" : true
    })      
}

//DELETE
const deleteHabit = async (req,res,next) => {
    let result = await habitSchema.deleteOne({_id : req.params.id});
    if(!result){
      return res.json({
         "error" : "error",
         "success" : false
         })  
     }
     return res.json({
         "message" : "habit deleted succesfully",
         "success" : true
     })
}

module.exports = { addHabit , getHabits , updateHabit , deleteHabit}