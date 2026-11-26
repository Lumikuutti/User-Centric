import express from 'express';
import mediaRouter from './media/media-router.js';
import userRouter from './users/user-router.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
app.use('/', express.static('public'));

app.get('/api', (req, res) => {
  res.render('index', {
    title: 'Example REST api',
    message: 'Dummy /items endpoint API for now.',
  });
});

app.use('/api/media', mediaRouter);
app.use('/api/users', userRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});