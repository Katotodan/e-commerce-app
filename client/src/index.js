import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import Product from './Components/Product/Product.jsx';
import {Item} from './Components/Item/item.js';
import NotFind from './Components/notFind.js';
import FindElmnt from './Components/searchResult';
import { Card } from './Components/Card/Card.jsx';

import { SignIn } from './pages/SignUp.js';
import { LogIn } from './pages/LogIn.js';
 
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
        element:<Product/>
      },
      {
        path:"/card",
        element:<Card/>
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
    path:"/signup",
    element:<SignIn/>,
    errorElement: <NotFind/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <div>
    <RouterProvider router={route}/>
  </div>
);




