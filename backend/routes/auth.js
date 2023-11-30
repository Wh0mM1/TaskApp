const express = require('express')
const router = express.Router();

const User = require('../Models/User')
const bcrypt  = require('bcryptjs')  
const fetchuser = require('../middleware/fetchuser')

const { body, validationResult } = require('express-validator')

const jwt = require('jsonwebtoken')
const JWT_secret = "deepreactapp"
 
//CREATING NEW USER
router.post('/create', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'enter a valid password').isLength({ min: 8 })
], async (req, res) => {

  try 
  {
    const { error } = validationResult(req);
    if (error) res.status(400).json(error.details[0].message)
  
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      success = false
      return res.status(400).json({success , error: "user with this email already exist" })
    }

    const salt = await bcrypt.genSalt(10)
    const secPassword = await bcrypt.hash(req.body.password , salt) // genertaed secured password
    
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
    })

    const data = 
    {
      user:
      {
        id:user.id
      }
    }

    const result = await user.save()
    const authtoken = jwt.sign(data , JWT_secret )
    success= true
    res.json({success,authtoken})
    
  } 
  catch (error) 
  {
    console.error(error.message)
    res.status(500).send("some Error occured")
    
  }
})


// for authentication of user , verifying if he is present in database......
router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Enter a valid password').exists()
], async (req, res) => 
{
  const { error } = validationResult(req)
  if(error)res.status(400).json(error.details[0].message)
  const { email , password } = req.body
try 
{
  let user = await User.findOne({email}); // finding email from database......

  if(!user) //email id does'nt exist
  {
    return res.status(400).json({error:"please enter valid credential"})
  }

  const passwordCompare = await bcrypt.compare(password , user.password) 
  if(!passwordCompare)
  {
    success=false
    return res.status(400).json(success , "please enter correct password")
  }

  const data = 
  {
    user:{
      id:user.id
    }
  }

  const authtoken  = jwt.sign(data , JWT_secret )
  success=true
  res.json({success ,authtoken})
} 
catch (error) 
{
   console.log(error.message)
   res.status(400).json({error:"Some internal error has occured"})
}

})

router.get("/getuser", fetchuser ,async (req,res)=>
{
  const { error } = validationResult(req)
  if(error)res.status(400).json(error.details[0].message)
  try 
  {
   const userid = req.user.id
   const user = await User.findById(userid).select("-password") //will give entire data without password 
   res.send(user)
  } 
  catch (error) 
  { 
    console.log(error)
    res.status(400).json(error.details[0].message)
    
  }

  
})
module.exports = router
