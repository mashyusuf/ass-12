import { FaHome, FaList, FaMoneyBill, FaShoppingCart, FaUser } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { TbBuildingPavilion } from "react-icons/tb";
import { CgFolderAdd } from "react-icons/cg";
import logo from '../assets/logo.jpg';
import useRole from '../hooks/useRole';
import { MdPayment } from "react-icons/md";
import { RiAdvertisementLine, RiVideoAddFill } from "react-icons/ri";
import { FcSalesPerformance } from "react-icons/fc";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
const Dashboard = () => {
    const [cart] = useCart();
    const [role, isLoading] = useRole();
    console.log(isLoading);
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Drawer */}
            <div className="w-80 bg-gradient-to-b from-sky-400 to-blue-600 text-white hidden md:flex flex-col">
                <div className="p-6">
                    <NavLink to={'/'} className="text-3xl font-bold mb-4 flex gap-x-2">
                        <img className='w-32' src={logo} alt="" />Medicine House
                    </NavLink>
                    <ul className="menu space-y-4">
                        {role === 'user' && (
                            <>
                            <li>
                            <NavLink
                                className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                to={'/dashboard/cart'}
                            >
                                <FaShoppingCart className="mr-2" /> My Cart <span className='text-xl font-bold'>{cart.length}</span>
                            </NavLink>
                        </li>
                                <li>
                            <NavLink
                                className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                to={'/dashboard/history'}
                            >
                                <FaMoneyBill className="mr-2" /> Payment History
                            </NavLink>
                             </li>
                            </>
                        )}
                        {role === 'admin' && (
                            <>
                            <li>
                            <NavLink
                                className='flex items-center text-2xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                to={'/dashboard/admin-dashboard'}
                                end
                            >
                                <TbBuildingPavilion className="mr-2" /> Dashboard
                            </NavLink>
                        </li>
                                <li>
                                    
                                    <NavLink
                                        className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                        to={'/dashboard/addCategory'}
                                    >
                                        <CgFolderAdd className="mr-2" /> Add Category Madicine
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                        to={'/dashboard/manage-users'}
                                    >
                                        <FaUser className="mr-2" />Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                        to={'/dashboard/admin-payment'}
                                    >
                                        <MdPayment className="mr-2" />Payment Management
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                        to={'/dashboard/manage-pro'}
                                    >
                                        <MdOutlineProductionQuantityLimits className="mr-2" /> Manage Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                        to={'/dashboard/admin-sales'}
                                    >
                                        <FcSalesPerformance className="mr-2" /> Sales Report
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                        to={'/dashboard/manage-add'}
                                    >
                                        <RiVideoAddFill className="mr-2" /> All Advertise
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {role === 'seller' && (
                            <>
                            <li>
                            <NavLink
                                className='flex items-center text-2xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                to={'/dashboard/seller-dashboard'}
                                end
                            >
                                <TbBuildingPavilion className="mr-2" /> Dashboard
                            </NavLink>
                        </li>
                                <li>
                                    <NavLink
                                        className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                        to={'/dashboard/add-room'}
                                    >
                                        <CgFolderAdd className="mr-2" /> Add Medicine
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                        to={'/dashboard/my-listing'}
                                    >
                                        <FaList className="mr-2" /> My Medicine List
                                    </NavLink>
                                </li>
                                <li>
                            <NavLink
                                className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                to={'/dashboard/seller-payment'}
                            >
                                <MdPayment className="mr-2" /> Payment History
                            </NavLink>
                        </li>
                                <li>
                            <NavLink
                                className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                to={'/dashboard/ad-seller'}
                            >
                               <RiAdvertisementLine  className="mr-2" /> Advertisement
                            </NavLink>
                        </li>
                            </>
                        )}
                        
                        <div className='divider'></div>
                        <li>
                            <NavLink
                                className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                to={'/'}
                            >
                                <FaHome className="mr-2" /> Home
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button md:hidden mb-4">Open Menubar</label>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <Outlet />
                </div>
            </div>

            {/* Responsive Drawer Toggle for Small Screens */}
            <div className="drawer drawer-mobile md:hidden ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Empty as main content is handled in flex layout */}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-gradient-to-b from-sky-400 to-blue-600 text-white space-y-4">
                        {/* Sidebar content here */}
                        <li>
                            <NavLink
                                className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                to={'/dashboard/cart'}
                            >
                                <FaShoppingCart className="mr-2" /> My Cart
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                to={'/dashboard/payment-history'}
                            >
                                <FaMoneyBill className="mr-2" /> Payment History
                            </NavLink>
                        </li>
                        <div className='divider'></div>
                        <li>
                            <NavLink
                                className='flex items-center text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                                to={'/'}
                            >
                                <FaHome className="mr-2" /> Home
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;