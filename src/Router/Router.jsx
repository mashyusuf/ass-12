import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home/Home";
import Shop from "../pages/shop/Shop";
import Login from "../pages/login/Login";
import SingUp from "../pages/singup/SingUp";
import NameCard from "../pages/home/MedicineName/NameCard";
import CardDetails from "../pages/home/Home/CardDetails/CardDetails";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/dashboardEra/cart/Cart";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Statistic from "../pages/dashboardEra/Common/Statistic";
import AddMedicine from "../pages/dashboardEra/Seller/AddMedicine";
import Mylistings from "../pages/dashboardEra/Seller/Mylistings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/shop',
                element: <Shop />
            },
            {
                path:"/cardName/:category", 
                element: <NameCard />,
            },
            {
                path:"/cardDetails/:id", 
                element: <CardDetails></CardDetails>,
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signUp',
                element: <SingUp />
            },
        ]
    },
    {
        path:'dashboard',
        element: <Dashboard></Dashboard>,
        children:[
            {
                index: true,
                element: <Statistic></Statistic>
            },
            {
                path:'cart',
                element: <Cart></Cart>
            },
            {
                path: 'add-room',
                element: <AddMedicine></AddMedicine>
            },
            {
                path: 'my-listing',
                element: <Mylistings></Mylistings>
            },
        ]
    }
]);


