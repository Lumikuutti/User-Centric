import express from 'express';
import {
  addMediaItem,
  deleteMediaItem,
  getAllMediaItems,
  getMediaItemById,
  modifyMediaItem,
} from './media.js';
import {
  getAllUsers,
  getUserById,
  addUser,
  modifyUser,
  deleteUser,
} from './users.js';
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
    title: 'Example REST API',
    message:
      'Dummy media items under /api/media and users under /api/users. You can GET them all by type (/media or /users), GET them by :id by adding /(id here), add an item with POST, modify with PUT (requires id) or DELETE (requires id).',
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
    res.status(204).json({message: 'No such Item!'});
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
    return res.status(204).json({message: 'No such Item!'});
  }
  res.json({message: 'Media updated!', updatedItem});
});

app.delete('/api/media/:id', (req, res) => {
  const success = deleteMediaItem(req.params.id);
  if (!success) {
    return res.status(204).json({message: 'No such Item!'});
  }
  res.json({message: 'Media deleted!'});
});

// user resource endpoints
// TODO: ADD
app.get('/api/users', (req, res) => {
  const users = getAllUsers(req.query.limit);
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(204).json({message: 'No such user'});
  }
});

app.post('/api/users', (req, res) => {
  // dummy validation example
  if (!req.body.username) {
    return res.status(400).json({error: 400, message: 'Something is missing!'});
  }
  addUser(req.body);
  res.status(201).json({message: 'New user added.'});
});

app.put('/api/users/:id', (req, res) => {
  const updatedUser = modifyUser(req.params.id, req.body);
  if (!updatedUser) {
    return res.status(204).json({message: 'No such user!'});
  }
  res.json({message: 'User updated!', updatedUser});
});

app.delete('/api/users/:id', (req, res) => {
  const success = deleteUser(req.params.id);
  if (!success) {
    return res.status(204).json({message: 'No such user!'});
  }
  res.json({message: 'User deleted!'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
