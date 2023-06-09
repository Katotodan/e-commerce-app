import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Main } from './Components/main.js';
import Item from './Components/item.js';
import NotFind from './Components/notFind.js';
import FindElmnt from './Components/searchResult';
import SignIn from './Components/signIn';
import LogIn from './Components/logIn'
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
      },
      {
        path:"/view/item/:params",
        element:<FindElmnt/>
      }
    ]
  },
  {
    path:"/login",
    element:<LogIn/>,
    errorElement: <NotFind/>
  },
  {
    path:"/signin",
    element:<SignIn/>,
    errorElement: <NotFind/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>
);




