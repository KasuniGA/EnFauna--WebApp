import express from 'express';
import { 
  getPhotos, 
  getPhoto, 
  createPhoto, 
  deletePhoto 
} from '../controllers/upload.controller.js';

const router = express.Router();

// GET all photos
router.get('/', getPhotos);

// GET single photo
router.get('/:id', getPhoto);

// POST create new photo
router.post('/', createPhoto);

// DELETE photo
router.delete('/:id', deletePhoto);

export default router;

console.log('Photo routes defined at /api/photos');