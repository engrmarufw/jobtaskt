import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import './index.css';
import Login from './Pages/Auth/Login/Login.jsx';
import Registration from './Pages/Auth/Registration/Registration.jsx';
import Carts from './Pages/Carts/Carts.jsx';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard.jsx';
import DashboardHome from './Pages/Dashboard/Dashboard/DashboardHome.jsx';
import AddNewProduct from './Pages/Dashboard/ManageProducts/AddNewProduct.jsx';
import ManageProducts from './Pages/Dashboard/ManageProducts/ManageProducts.jsx';
import Home from './Pages/Home/Home/Home.jsx';
import Products from './Pages/Products/Products/Products.jsx';
import ViewProduct from './Pages/Products/Products/ViewProduct.jsx';
import AuthProvider from './Pages/Providers/AuthProvider.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/addnewproduct",
        element: <PrivateRoute><AddNewProduct /></PrivateRoute>,
      },
      {
        path: "/products/view/:productID",
        element: <PrivateRoute> <ViewProduct /></PrivateRoute>,
      },
      {
        path: "/carts",
        element: <PrivateRoute>  <Carts /></PrivateRoute>,
      },

    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/manageproduct",
        element: <ManageProducts />,
      },
      {
        path: "/dashboard/addnewproduct",
        element: <AddNewProduct />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>

)
