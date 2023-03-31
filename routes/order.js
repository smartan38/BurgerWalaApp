import express from "express"
import { getAdminOrders, getMyOrders, getOrderDetails,paymentVerification, placeOrder, placeOrderOnline, processOrder ,placeContact} from "../controllers/order.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { Contact } from "../models/User.js";

const router=express.Router();

router.post("/createorder",placeOrder)
router.post("/createorderonline",placeOrderOnline)
router.post("/paymentverification", paymentVerification)
router.get("/myorders",isAuthenticated,getMyOrders)
router.get("/order/:id", isAuthenticated,getOrderDetails)
// add admin middleware for access to admin only
router.get("/admin/orders", isAuthenticated,authorizeAdmin , getAdminOrders)
router.get("/admin/order/:id", isAuthenticated,authorizeAdmin, processOrder)
router.post("/contact",placeContact)
export default router;
