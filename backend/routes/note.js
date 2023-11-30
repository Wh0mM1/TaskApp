const express = require('express') 
const router = express.Router();
const Notes = require('../Models/Notes');  // Schema
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator')


router.get('/fetchnotes',fetchuser , async (req,res)=>
{
   const notes = await Notes.find({user:req.user.id}) 
   res.send(notes)
})

router.post('/upload',fetchuser,[
   body('title', 'Enter a valid title').isLength({ min: 4 }),
   body('discription', 'Enter a valid Email').isLength({min:5}),
   body('tags', 'Enter a valid tags')
],async(req , res)=>
{  

   try 
   { 
      const { title , discription , tag} = req.body
      const { error } = validationResult(req)
      if(error)res.status(400).json(error.details[0].message)

      const note = new Notes({
         title , discription , tag  , user : req.user.id
      })

      const result = await note.save()
      res.json(result)

   } 
   catch (error) {
      console.log(error)
      res.status(400).json({error:'internal error has occured'})
   }

})

router.put('/update/:id',fetchuser,async(req,res)=>
{
   try {
      const { title , discription , tag}  = req.body
      const newNote = {}
      if(title){newNote.title = title}
      if(discription){newNote.discription =  discription}
      if(tag){newNote.tag = tag}
   
      let notes = await Notes.findById(req.params.id)
      if(!notes){return res.status(404).send("not found")} // data with this user id is present or not
   
      if(notes.user.toString() !== req.user.id)
      {
         return res.status(400).send({error:"not allowed"})
      }
   
      notes = await Notes.findByIdAndUpdate(req.params.id , { $set:newNote } , {new : true})
      res.json({notes})
   
   } catch (error) {
      console.log(error)
      res.status(400).json({error:'internal error has occured'})
   }

})

router.delete('/delete/:id',fetchuser,async(req,res)=>
{

   try {
      let notes = await Notes.findById(req.params.id)
      if(!notes){return res.status(404).send("not found")}
   
      if(notes.user.toString() !== req.user.id)
      {
         return res.status(400).send({error:"not allowed"})
      }
   
      notes = await Notes.findByIdAndDelete(req.params.id)
      res.json({"Success":"successfully deleted the note" ,  notes:notes})
      
   } catch (error) {
      console.log(error)
      res.status(400).json({error:'internal error has occured'})
   }
  

})
module.exports = router
