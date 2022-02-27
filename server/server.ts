import express from 'express';
import path from 'path';
import repository from './routes/repository';

const publicPath = path.join(__dirname, '..', 'dist');

const app = express();

app.use(express.json({ limit: '5mb' })); // support json encoded bodies

// dev tools
const loadDevTools = async () => {
  const { devTools } = await import('./dev/dev');
  devTools(app);
};

if (process.env.NODE_ENV === 'development') loadDevTools();
app.use('/api', repository);

app.use(express.static(publicPath));

// catch all
// * turno off on dev. reason HMR doesn't work with this on.
// if (process.env.NODE_ENV !== 'development') {
app.get('*', (req, res) => {
  // res.set('Content-Type', 'text/event-stream');
  res.status(200).sendFile(path.join(publicPath, 'index.html'));
});

// app.use('*', express.static(path.join(publicPath, 'index.html')));

export default app;
