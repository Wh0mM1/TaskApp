const mongoose = require("mongoose")
const { Schema } = mongoose

const Noteschema = new Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId ,  //another models object id.....
            ref:'user'
        },
        title:{
            type : String ,
            required : true
        },

        discription:{
            type:String,
            required:true,
        },
        tag:{
            type:String,
            default:"General"
        },
        date:{
            type:Date,
            default:Date.now
        }
        
    }
);

module.exports = mongoose.model('notes',Noteschema)