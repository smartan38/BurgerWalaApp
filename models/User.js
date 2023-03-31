import mongoose from "mongoose";

const schema=new mongoose.Schema({
    name :String,
    photo :String,
    googleId :{
        type:String,
        required :true,
        unique: true,
    },
    role:{
        type: String,
        enum:["admin","user"],
        default:"user",
    },
    createdAT :{
        type : Date,
        default : Date.now,
    },


})

export const User = mongoose.model("User",schema)

const schema1 = new mongoose.Schema({
    name :{
        type: String,
        require : true,
    },
    email :{
      type : String,
      require : true,
},
    message : {
        type : String ,
        require : true,
    }
})

export const Contact =mongoose.model("Contact",schema1)
        
    
    
