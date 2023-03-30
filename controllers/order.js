  import { asyncError } from "../middlewares/errorMiddleware.js"
import {Order} from "../models/order.js"
import {Payment} from "../models/Payment.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import {instance} from "../server.js"

export const placeOrder= asyncError(async (req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemPrice,
        shippingCharges,
        totalAmount,
    }=req.body;
    const user=req.user._id;
    const orderOptions={
        shippingInfo,
        orderItems,
        paymentMethod,
        itemPrice,
        shippingCharges,
        totalAmount,
        user,
    }
    await Order.create(orderOptions);
    res.status(200).json({
        success : true,
        message :"Order placed successfully via COD"
    })
})


export const placeOrderOnline= asyncError(async (req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemPrice,
        shippingCharges,
        totalAmount,
    }=req.body;
    const user=req.user._id;
    const orderOptions={
        shippingInfo,
        orderItems,
        paymentMethod,
        itemPrice,
        shippingCharges,
        totalAmount,
        user,
    }
    // razorpay integration
    const options={
        amount : Number(totalAmount)*100,
        currency : "INR",
    }
    const order = await instance.orders.create(options)

 
    res.status(200).json({
        success : true,
       order,
       orderOptions,
    })
})

// razorpay payment verification
export const paymentVerification =asyncError(async(req,res,next)=>{
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature,orderOptions}=req.body 
    const body=razorpay_payment_id + "|" + razorpay_order_id
    const expectedSignature =crypto.createHmac("sha256",process.env.RAZORPAY_SECRET_KEY).update(body).digest("hex"); 
    if(razorpay_signature===expectedSignature)
    {
        const payment=await Payment.create({
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        })
        await Order.create({
            ...orderOptions,
            paidAt :new Date(Date.now()),
            paymentInfo : payment._id, 
        })
        res.status(200).json({
            success :true,
            message :`Order Placed Successfully : ${payment._id}`,
        })
    }
    else{
       return next(new ErrorHandler("payment Failed",400)) 
    }
})

export const getMyOrders = async(req,res,next)=>{
    const orders = await Order.find({
        user : req.user._id,
    }).populate("user","name");
    res.status(200).json({
        success : true,
        orders,
    })
}

 export const getOrderDetails = asyncError(async(req,res,next)=>{
   const order = await Order.findById(req.params.id).populate("user","name");
   if(!order)
   return next(new ErrorHandler("Invalid order id",404));
   res.status(200).json({
    success :true,
    order,
   })
 })

 export const getAdminOrders = asyncError(async(req,res,next)=>{
    const orders = await Order.find({
      
    }).populate("user","name");
    res.status(200).json({
        success : true,
        orders,
    })
}
) 

export const processOrder = asyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order)
    return next(new ErrorHandler("Invalid order id",404));
    if(order.orderStatus==="preparing")
    order.orderStatus="shipped";
    else if(order.orderStatus==="shipped")
    {
        order.orderStatus="delivered";
        order.deliveredAt=new Date(Date.now()) ;
    }
    else if(order.orderStatus==="delivered")
    return next(new ErrorHandler("Already Delivered",400))

    await order.save();
    res.status(200).json({
        success : true,
   message:"Status updated successfully"
    })
}
) 

 
