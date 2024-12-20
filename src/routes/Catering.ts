import express from 'express';
import { jwtMiddleware } from '../middleware/JwtMiddleware';
import { isOwnerMiddleware } from '../middleware/isOwnerMiddleware';
import {
  createCatering,
  getAllCaterings,
  getCateringById,
  updateCatering,
  deleteCatering,
  addScheduleAndFood,
  addPaketWithSchedules,
  searchCatering,
  deletePaket,
} from '../handlers/cateringHandlers';
import { userMiddleware } from '../middleware/UserMiddleware';

const router = express.Router();

router.post('/', userMiddleware, createCatering);
router.get('/', getAllCaterings);
router.get('/:cateringId', getCateringById);
router.put('/:cateringId', jwtMiddleware, isOwnerMiddleware, updateCatering);
router.delete('/:cateringId', jwtMiddleware, isOwnerMiddleware, deleteCatering);
router.post('/:cateringId/schedules', jwtMiddleware, isOwnerMiddleware, addScheduleAndFood);
router.post('/:cateringId/pakets', jwtMiddleware, isOwnerMiddleware, addPaketWithSchedules);
router.post('/search', searchCatering);
router.delete('/deletepaket/:paketId', deletePaket);


export default router;