const jwt = require('jsonwebtoken')

const JWT_secret = "deepreactapp"


function fetchuser(req , res , next)
{
    const token = req.header('auth-token')
    if(!token)
    {
        res.status(401).json({error:'Please authenticate with valid content'})
    }
    try {
        const  data = jwt.verify(token , JWT_secret)
        req.user = data.user
        next()
        
    } catch (error) {
        console.log(error)
        res.status(401).json({error:'Please authenticate with valid content'})
 
    }

}

module.exports = fetchuser