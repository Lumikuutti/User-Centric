import express from 'express';
import {
  deleteMediaItem,
  getMediaItemById,
  getMediaItems,
  postMediaItem,
  putMediaItem,
} from './media-controller.js';
import upload from '../middlewares/upload.js';

const mediaRouter = express.Router();

mediaRouter.route('/')
  .get(getMediaItems)
  .post(upload.single('file'), postMediaItem);

mediaRouter.route('/:id')
  .get(getMediaItemById)
  .put(putMediaItem)
  .delete(deleteMediaItem); // Poistoreitti

export default mediaRouter;