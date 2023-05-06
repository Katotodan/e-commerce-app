import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Main } from './Components/main.js';
import Item from './Components/item.js';
import NotFind from './Components/notFind.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const route = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement: <NotFind/>,
    children:[
      {
        path:"/",
        element:<Main/>
      },
      {
        path:"/:id",
        element:<Item/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>
);




