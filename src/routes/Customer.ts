import express from "express";
import { jwtMiddleware } from "../middleware/JwtMiddleware";
import {
  registerCustomer,
  getCustomerDetails,
  updateCustomerDetails,
} from "../handlers/customerHandlers";

const router = express.Router();

router.post("/register", jwtMiddleware, registerCustomer);
router.get("/me", jwtMiddleware, getCustomerDetails);
router.put("/me", jwtMiddleware, updateCustomerDetails);

export default router;
