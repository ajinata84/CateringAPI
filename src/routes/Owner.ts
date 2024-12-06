import express from 'express';
import multer from 'multer';
import { jwtMiddleware } from '../middleware/JwtMiddleware';
import {
  registerOwner,
  updateOwnerDetails,
} from '../handlers/ownerHandlers';

const router = express.Router();
const upload = multer();

router.post('/register', upload.none(), registerOwner);
router.put('/me', upload.none(), jwtMiddleware, updateOwnerDetails);

export default router;