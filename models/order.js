import mongoose from "mongoose";
import { User } from "./User.js";

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
    },
})

export const Contact =mongoose.model("Contact",schema1);

const schema = new mongoose.Schema({
    shippingInfo :{
        hNo :{
            type :String,
            required:true,
        },
        city :{
            type :String,
            required :true,
        },
        state :{
            type :String,
            required :true,
        },
        country :{
            type :String,
            required :true,
        },
        pinCode :{
            type :Number,
            required :true,
        },
        phoneNo:{
            type :Number,
            required :true,
        },
    },
orderItems :{
    cheeseBurger :{
        price:{
            type :Number,
            required :true,
        },
        quantity:{
            type :Number,
            required :true,
        },

    },
    vegCheeseBurger :{
        price:{
            type :Number,
            required :true,
        },
        quantity:{
            type :Number,
            required :true,
        },

    },
    burgerWithFries :{
        price:{
            type :Number,
            required :true,
        },
        quantity:{
            type :Number,
            required :true,
        },

    },
},
    user :{
        type:mongoose.Schema.ObjectId,
        ref :"User",
        required : true, 
    
    }, 
    paymentMethod:{
        type : String,
        enum : ["COD","Online"],
        default :"COD",
    },
    paidAt :Date,
    itemPrice :{
        type :Number,
       
    },
    taxPrice :{
        type :Number,
       
    },
    shippingCharges :{
        type :Number,
     
    },
    totalAmount :{
        type :Number,
       
    },
    orderStatus :{
        type :String,
        enum :["preparing","shipped","delivered"],
        default:"preparing",
    },
    deliveredAt:Date,
    createdAt:{
        type: Date,
        dafault:Date.now,
    },


},

)

export const Order = mongoose.model("Order",schema)
