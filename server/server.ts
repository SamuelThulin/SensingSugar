import path from 'path';
import express from 'express';

const publicPath = path.join(__dirname, '..', 'dist');

const app = express();

app.use(express.json({ limit: '5mb' })); // support json encoded bodies

// dev tools
const loadDevTools = async () => {
  const { devTools } = await import('./dev/dev');
  devTools(app);
};

if (process.env.NODE_ENV === 'development') loadDevTools();

app.use(express.static(publicPath));

// app.use('*', express.static(path.join(publicPath, 'index.html')));

export default app;
