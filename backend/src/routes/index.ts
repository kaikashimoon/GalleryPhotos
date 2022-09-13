import { Router } from "express";
import { getPhoto, getOnePhoto, createPhoto, updatePhoto, deletePhoto } from "../controllers/photoControllers";
import multer from "../libs/multer";
const router = Router();

router.get('/', getPhoto);
router.get('/:id', getOnePhoto);
router.post('/', multer.single('image'), createPhoto);
router.put('/:id', updatePhoto);
router.delete('/:id', deletePhoto);    

export default router