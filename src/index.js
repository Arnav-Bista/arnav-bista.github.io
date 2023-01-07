import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import ErrorPage from './common/ErrorPage';
import NavBar from './common/NavBar';

import './common/BaseStyles.css';
import Portfolio from './routes/portfolio/Portfolio';

const router = createBrowserRouter([
  {
    path:"/",
    element:<NavBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Portfolio /> 
      },
      {
        path: "all",
        element:<h1>All Projects!</h1>
      },
      {
        path: "aboutme",
        element:<h1>About me!</h1>
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);