import React from 'react';
import BlankLayout from './layouts/Blank';
import DefaultLayout from './layouts/Default';
import DataForm from './views/DataForm';
import NotFound from './views/error/NotFoundView';
import Gallery from './views/Gallery';
import Home from './views/Home';
import Playground from './views/Playground';
import Play from './views/Play';


const routes = [
  {
    path: '/play',
    element: <BlankLayout />,
    children: [
      { index: true, element: <Play /> },
      { path: ':sample', element: <Play /> }
    ],
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'form', element: <DataForm /> },
      { path: 'gallery', element: <Gallery /> },
      // { path: 'play', element: <Play /> },
      { path: 'playground', element: <Playground /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
