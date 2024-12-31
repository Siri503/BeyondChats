import express from 'express';
import  verifyToken from "../utils/verifyUser.js";
import { createStocking } from '../controllers/stock.controller.js';
const router=express.Router();
router.post('/create',verifyToken,createStocking);
export default router;