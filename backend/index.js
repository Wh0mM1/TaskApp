const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')


connectToMongo();

const app = express() // to use .get , .use , .listen function


app.use(express.json()) //to use req-body - middle ware
app.use(cors())

//avilable routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/note'))



const port = process.env.PORT || 8080

app.listen(port , ()=>
{
  console.log(`App is listning at http://localhost:${port}`)
})

