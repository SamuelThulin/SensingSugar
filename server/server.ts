import express from 'express';
import path from 'path';
import repository from './routes/repository';

const publicPath = path.join(__dirname, '..', 'dist');

const server = express();

server.use(express.json({ limit: '5mb' })); // support json encoded bodies

// dev server
const loadDevServer = async () => {
  const { devServer } = await import('./dev');
  devServer(server);
};

if (process.env.NODE_ENV === 'development') loadDevServer();
server.use('/api', repository);

server.use(express.static(publicPath));

// catch all
// * turno off on dev. reason HMR doesn't work with this on.
// if (process.env.NODE_ENV !== 'development') {
server.get('*', (req, res) => {
  // res.set('Content-Type', 'text/event-stream');
  res.status(200).sendFile(path.join(publicPath, 'index.html'));
});

// app.use('*', express.static(path.join(publicPath, 'index.html')));

export default server;
