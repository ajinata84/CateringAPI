import express from "express";
import multer from 'multer';

import { jwtMiddleware } from "../middleware/JwtMiddleware";
import {
  registerCustomer,
  getCustomerDetails,
  updateCustomerDetails,
} from "../handlers/customerHandlers";

const router = express.Router();
const upload = multer();


router.post("/register", upload.none(),  registerCustomer);
router.get("/me", jwtMiddleware, getCustomerDetails);
router.put("/me", jwtMiddleware, updateCustomerDetails);

export default router;  
