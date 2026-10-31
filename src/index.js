import express from 'express';
import {
  addMediaItem,
  deleteMediaItem,
  getAllMediaItems,
  getMediaItemById,
  modifyMediaItem,
} from './media.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());

// public-kansion kaikki sisältö tarjoillaan palvelimen juuri-urlissa
app.use('/', express.static('public'));

// API "docs" using pug template engine
app.get('/api', (req, res) => {
  res.render('index', {
    title: 'Example REST api',
    message: 'Dummy /items endpoint API for now.',
  });
});

// Media resource routes (/api/media endpoints)
app.get('/api/media', (req, res) => {
  const items = getAllMediaItems(req.query.limit);
  res.json(items);
});

app.get('/api/media/:id', (req, res) => {
  const mediaItem = getMediaItemById(req.params.id);
  if (mediaItem) {
    res.json(mediaItem);
  } else {
    res.status(404).json({error: 404, message: 'Not found'});
  }
});

app.post('/api/media', (req, res) => {
  // dummy validation example
  if (!req.body.title) {
    return res.status(400).json({error: 400, message: 'Something missing!'});
  }
  addMediaItem(req.body);
  res.status(201).json({message: 'New media item added.'});
});

app.put('/api/media/:id', (req, res) => {
  const updatedItem = modifyMediaItem(req.params.id, req.body);
  if (!updatedItem) {
    return res.status(404).json({error: 404, message: 'Item not found!'});
  }
  res.json({message: 'Media updated!', updatedItem});
});

app.delete('/api/media/:id', (req, res) => {
  const success = deleteMediaItem(req.params.id);
  if (!success) {
    return res.status(404).json({error: 404, message: 'Item not found!'});
  }
  res.json({message: 'Media deleted!'});
});

// user resource endpoints
// TODO: ADD

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
