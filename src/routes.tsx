import React from 'react';
import BlankLayout from './layouts/Blank';
import DefaultLayout from './layouts/Default';
import DataForm from './views/DataForm';
import NotFound from './views/error/NotFoundView';
import Gallery from './views/Gallery';
import Home from './views/Home';
import Play from './views/Play';
import Playground from './views/Playground';

const routes = [
  {
    path: '/play',
    element: <BlankLayout />,
    children: [
      { index: true, element: <Play /> },
      { path: ':sample', element: <Play /> },
    ],
  },
  {
    path: '/playground',
    element: <BlankLayout />,
    children: [{ index: true, element: <Playground /> }],
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'form', element: <DataForm /> },
      { path: 'gallery', element: <Gallery /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
