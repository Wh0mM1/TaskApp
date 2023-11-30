const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1/inotebook"

mongoose.set("strictQuery", false); // if not use throws error

const connectToMongo=()=>
{
    mongoose.connect(mongoURI , ()=>{
        console.log("connected to mongo succesfully")
    })
}

module.exports = connectToMongo ;
