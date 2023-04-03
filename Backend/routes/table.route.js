
const express = require("express");
const Table = require("../models/table.model");
const uploads = require("../middlewares/uploads");
require("dotenv").config();
const router = express.Router();

router.get("/",async(req,res)=>{
  try{
      const table=await Table.find()
      return res.status(200).json({table:table})
      
  
  }catch(err){
      return res.status(404).json({msg:err.message})
  }

})



router.post("/",uploads.single("image"),async(req,res)=>{
    try {
      let id1;
      let id = await Table.find().sort({ 'createdAt' : -1 })
      // console.log(id)
      if(id[0]){
         id1 = (+id[0].id +1).toString()
      }else{
         id1 = "1"
      }
      req.body.id = id1
            var locaFilePath = req.file.filename;
            console.log("locaFilePath===>",locaFilePath)
       
            const table = await Table.create({file: `http://localhost:5000/my-uploads/${locaFilePath}`,...req.body})
            console.log("res===.>",table)
            res.status(200).send({messsage:"Successfully Added",data:table})

        
      } catch (err) {
        return res.status(500).send({ message: err.message, data: err });
      }
    })

module.exports = router;