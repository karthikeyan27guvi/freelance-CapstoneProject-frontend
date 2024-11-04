import React from 'react';
import {createBrowserRouter,RouterProvider,Outlet} from "react-router-dom";
import Navbar from './componets/navbar/Navbar';
import Footer from './componets/footer/Footer';
import Home from './pages/home/Home';
import Gigs from './pages/gigs/Gigs';
import Gig from './pages/gig/Gig';
import MyGigs from './pages/myGigs/MyGigs';
import Orders from './pages/orders/Orders';
import Add from './pages/add/Add';
import Message from './pages/message/Message';
import Messages from './pages/messages/Messages';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Pay from './pages/pay/Pay';
import Success from './pages/success/Success';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()


  const Layout =()=>{
    return(
      <div className="app">
      <QueryClientProvider client={queryClient}>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
        path: "/",
        element: <Home/>
      },
      {
        path: "/gigs",
        element: <Gigs/>
      },
      {
        path: "/gig/:id",
        element: <Gig/>
      },
      {
        path: "/orders",
        element: <Orders/>
      },
      {
        path: "/mygigs",
        element: <MyGigs/>
      },
      {
        path: "/add",
        element: <Add/>
      },
      {
        path: "/messages",
        element: <Messages/>
      },
      {
        path: "/message/:id",
        element: <Message/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword/>
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword/>
      },
      {
        path: "/pay/:id",
        element: <Pay/>
      },
      {
        path: "/success",
        element: <Success/>
      },
    ]
    },
  ]);

  return (
    <div>
     <RouterProvider router={router} />
    </div>
  )
}

export default App
