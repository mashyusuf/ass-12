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
import Profile from "../pages/dashboardEra/Common/Profile";
import ManageUsers from "../pages/dashboardEra/Admin/ManageUser";
import PrivateRouter from './PrivateRouter'
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import Payment from "../pages/dashboardEra/Payment/Payment";
import PaymentHistory from "../pages/dashboardEra/Payment History/PaymentHistory";
import SellerDashboard from "../pages/dashboardEra/Seller/SellerDashboard";
import AdminStatistics from "../pages/dashboardEra/Admin/AdminDashboard";
import AddCategory from "../pages/dashboardEra/Admin/AddCategory";
import AdSeller from "../pages/dashboardEra/Seller/AdSelller";
import ManageBannerAdvertise from "../pages/dashboardEra/Admin/ManageBannerAdvertise";
import ManagePro from "../pages/dashboardEra/Admin/ManagePro";
import PaymentForAdmin from "../pages/dashboardEra/Admin/PaymentForAdmin";
import SalesReport from "../pages/dashboardEra/Admin/SalesReport";
import SellerPayment from "../pages/dashboardEra/Seller/SellerPayment";
import UpdateCategory from "../pages/dashboardEra/Admin/UpdateCategory";
import UpdateProfile from "../Components/updateProfile/UpdateProfile";

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
                element: <Shop />,
                loader: ()=> fetch('http://localhost:8000/totalMedicineCount')
            },
            {
                path:"/cardName/:category", 
                element: <NameCard />,
            },
            {
                path:"/cardDetails/:id", 
                element:<PrivateRouter><CardDetails></CardDetails></PrivateRouter> ,
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            },
            {
                path: '/signUp',
                element: <SingUp />
            },
            {
                path: '/updateProfile',
                element: <UpdateProfile></UpdateProfile>
            },
        ]
    },
    {
        path:'dashboard',
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
        children:[
            {
                index: true,
                element: <PrivateRouter><Statistic></Statistic></PrivateRouter>
            },
            {
                path:'cart',
                element: <PrivateRouter><Cart></Cart></PrivateRouter>
            },
            {
                path:'payment',
                element: <PrivateRouter><Payment></Payment> </PrivateRouter>
            },
            {
                path:'history',
                element: <PrivateRouter><PaymentHistory></PaymentHistory> </PrivateRouter>
            },
            //-------Seller Era---------------------
            {
                path: 'seller-dashboard',
                element:<PrivateRouter> <SellerRoute> <SellerDashboard></SellerDashboard>  </SellerRoute></PrivateRouter>
            },
            {
                path: 'add-room',
                element:<PrivateRouter> <SellerRoute><AddMedicine></AddMedicine></SellerRoute></PrivateRouter>
            },
            {
                path: 'my-listing',
                element: <PrivateRouter><SellerRoute><Mylistings></Mylistings></SellerRoute> </PrivateRouter>
            },
            {
                path: 'ad-seller',
                element: <PrivateRouter><SellerRoute> <AdSeller></AdSeller> </SellerRoute> </PrivateRouter>
            },
            {
                path: 'seller-payment',
                element: <PrivateRouter><SellerRoute> <SellerPayment></SellerPayment> </SellerRoute> </PrivateRouter>
            },

            //-----Admin Era------
            {
                path: 'admin-dashboard',
                element: <PrivateRouter><AdminRoute> <AdminStatistics></AdminStatistics>   </AdminRoute></PrivateRouter>
            },
            {
                path: 'addCategory',
                element: <PrivateRouter><AdminRoute> <AddCategory></AddCategory>   </AdminRoute></PrivateRouter>
            },
            {
                path: 'manage-users',
                element: <PrivateRouter><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRouter>
            },
            {
                path: 'manage-add',
                element: <PrivateRouter><AdminRoute> <ManageBannerAdvertise></ManageBannerAdvertise>  </AdminRoute></PrivateRouter>
            },
            {
                path: 'manage-pro',
                element: <PrivateRouter><AdminRoute> <ManagePro></ManagePro>  </AdminRoute></PrivateRouter>
            },
            {
                path: 'admin-payment',
                element: <PrivateRouter><AdminRoute> <PaymentForAdmin></PaymentForAdmin>  </AdminRoute></PrivateRouter>
            },
            {
                path: 'admin-sales',
                element: <PrivateRouter><AdminRoute> <SalesReport></SalesReport> </AdminRoute></PrivateRouter>
            },
            {
                path: 'updateCategory/:id',
                element: <PrivateRouter> <AdminRoute> <UpdateCategory /> </AdminRoute></PrivateRouter>,
            },
        ]
    }
]);


