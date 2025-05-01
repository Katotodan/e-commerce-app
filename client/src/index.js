import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import {Product} from './Components/Product/Product.jsx';
import {Item} from './Components/Item/item.js';
import NotFind from './Components/notFind.js';
import { Card } from './Components/Card/Card.jsx';

import { SignIn } from './pages/SignUp.js';
import { LogIn } from './pages/LogIn.js';
 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { loaderOnLogIn, getUserLoader } from './loaders.js';

const route = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    hydrateFallbackElement: <h2>Loading...</h2>,
    loader: getUserLoader,
    errorElement: <NotFind/>,
    children:[
      {
        path:"/",
        element:<Product/>,        
      },
      {
        path:"/search",
        element:<Product/>
      },
      {
        path:"/card",
        element:<Card/>
      },
      {
        path:"/:id",
        element:<Item/>
      }
    ]
  },
  {
    path:"/login",
    element:<LogIn/>,
    hydrateFallbackElement: <h2>Loading</h2>,
    loader: loaderOnLogIn,
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
// Next working on buy functionality



