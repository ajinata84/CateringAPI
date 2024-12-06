import express from 'express';
import multer from 'multer';
import { registerUser, loginUser } from '../handlers/authHandlers';

const router = express.Router();
const upload = multer();

router.post('/register', upload.none(), registerUser);
router.post('/login', upload.none(), loginUser);

export default router;