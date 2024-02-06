import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import './index.css'
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies'
import { Footer } from './components/Footer';
import MovieDetails from './pages/MovieDetails/MovieDetails';

function AppLayout() {
  return <>
    <Header />
    <Outlet />
    <Footer />
  </>
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/",
      element: <Home />,
    },
    {
      path: "/peliculas",
      element: <Movies />,
    },{
      path: "/pelicula/:id",
      element: <MovieDetails />,
    }]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>
)
