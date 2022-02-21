import React from 'react';
import BlankLayout from './layouts/BlankLayout';
import DataForm from './views/DataForm';
import NotFound from './views/error/NotFoundView';
import Gallery from './views/Gallery';
import Home from './views/Home';
import Playground from './views/Playground';
import Play from './views/Play';


const routes = [
  // {
  //   path: '/edit',
  //   element: <BlankLayout />,
  //   children: [{ index: true, element: <Editor /> }],
  // },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'form', element: <DataForm /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'play', element: <Play /> },
      { path: 'playground', element: <Playground /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
