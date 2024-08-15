import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose, AiOutlineLogout } from 'react-icons/ai';
import { FaCartPlus, FaUserCircle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Container from './Container';
import avatarImg from '../../assets/placeholder.jpg';
import logo from '../../assets/logo-removebg-preview.png';
import useCart from '../../hooks/useCart';
import HostModal from '../../Components/Modal/SellerRequestModal';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useRole from '../../hooks/useRole';
import { Transition } from '@headlessui/react';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const [role, isLoading] = useRole();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const modalHandle = async () => {
    try {
      const currentUser = {
        email: user?.email,
        role: 'user',
        status: 'Requested',
      };
      const { data } = await axiosSecure.put('/user', currentUser);
      if (data.modifiedCount > 0) {
        toast.success('Request successfully submitted! Now wait for admin approval.');
      } else {
        toast.success('Request pending admin approval.');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };

  const handleItemClick = (item) => setActiveItem(item);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  if (isLoading) return <span className="loading loading-bars loading-lg"></span>;

  return (
    <div className='fixed w-full z-10 shadow-lg bg-gray-900'>
      <div className='py-4 border-b border-gray-600'>
        <Container>
          <div className='flex items-center justify-between'>
            {/* Logo and Name */}
            <Link to='/' className='flex items-center space-x-4'>
              <img src={logo} alt='logo' className='w-16 h-16 rounded-full' />
              <p className='text-3xl font-extrabold text-teal-300'>Medicine House</p>
            </Link>
            {/* Menu Button for Mobile */}
            <div className='md:hidden flex items-center'>
              <button onClick={toggleMenu} className='text-white text-2xl mr-4'>
                {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
              {/* Shopping Cart Icon for Small Devices */}
              <Link to='/dashboard/cart' className='text-white text-2xl mr-4'>
                <FaCartPlus className='relative'>
                  {cart.length > 0 && (
                    <span className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-1 rounded-full'>
                      {cart.length}
                    </span>
                  )}
                </FaCartPlus>
              </Link>
              {/* User Profile Icon for Small Devices */}
              {user && (
                <button onClick={toggleDropdown} className='relative'>
                  <img
                    className='w-8 h-8 rounded-full'
                    src={user.photoURL || avatarImg}
                    alt='profile'
                  />
                  {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded-md shadow-lg py-2 z-20'>
                      <button
                        onClick={logOut}
                        className='w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center'
                      >
                        <AiOutlineLogout className='mr-2' /> Logout
                      </button>
                    </div>
                  )}
                </button>
              )}
            </div>
            {/* Desktop Menu */}
            <div className='hidden md:flex items-center space-x-6'>
              <Link
                to='/'
                className={`text-2xl font-bold ${activeItem === 'Home' ? 'text-yellow-400' : 'text-gray-300'} hover:text-teal-400`}
                onClick={() => handleItemClick('Home')}
              >
                Home
              </Link>
              <Link
                to='/shop'
                className={`text-2xl font-bold ${activeItem === 'Shop' ? 'text-yellow-400' : 'text-gray-300'} hover:text-teal-400`}
                onClick={() => handleItemClick('Shop')}
              >
                Shop
              </Link>
              <Link
                to='/dashboard/cart'
                className={`text-2xl font-bold ${activeItem === 'Cart' ? 'text-yellow-400' : 'text-gray-300'} hover:text-teal-400`}
              >
                <button className="relative flex items-center">
                  <FaCartPlus className='text-2xl' />
                  {cart.length > 0 && (
                    <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {cart.length}
                    </div>
                  )}
                </button>
              </Link>
              {(role === 'admin' || role === 'seller') && (
                <Link
                  to='/dashboard'
                  className={`text-2xl font-bold ${activeItem === 'Dashboard' ? 'text-yellow-400' : 'text-gray-300'} hover:text-teal-400`}
                  onClick={() => handleItemClick('Dashboard')}
                >
                  Dashboard
                </Link>
              )}
              {role === 'user' && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className='px-4 py-2 bg-teal-500 text-white font-bold rounded-full hover:bg-teal-600'
                >
                  Request To Be Seller
                </button>
              )}
              {user ? (
                <div className='relative'>
                  <button
                    onClick={toggleDropdown}
                    className='flex items-center space-x-2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600'
                  >
                    <img
                      className='w-10 h-10 rounded-full'
                      src={user.photoURL || avatarImg}
                      alt='profile'
                    />
                  </button>
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg py-2 z-20'>
                      <button
                        onClick={logOut}
                        className='w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center'
                      >
                        <AiOutlineLogout className='mr-2' /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to='/login'>
                  <button className='px-6 py-2 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700'>
                    Join Us
                  </button>
                </Link>
              )}
            </div>
          </div>
          {/* Mobile Menu */}
          <Transition
            show={isMenuOpen}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className='fixed inset-0 bg-black bg-opacity-50 z-20'>
              <div className='absolute top-0 left-0 w-2/3 bg-gray-900 h-full p-6'>
                <button
                  onClick={toggleMenu}
                  className='text-white text-2xl absolute top-4 right-4'
                >
                  <AiOutlineClose />
                </button>
                <div className='flex flex-col space-y-4 mt-12'>
                  <Link
                    to='/'
                    className={`text-xl font-bold ${activeItem === 'Home' ? 'text-yellow-400' : 'text-gray-300'} hover:text-teal-400`}
                    onClick={() => handleItemClick('Home')}
                  >
                    Home
                  </Link>
                  <hr className='border-gray-700' />
                  <Link
                    to='/shop'
                    className={`text-xl font-bold ${activeItem === 'Shop' ? 'text-yellow-400' : 'text-gray-300'} hover:text-teal-400`}
                    onClick={() => handleItemClick('Shop')}
                  >
                    Shop
                  </Link>
                  <hr className='border-gray-700' />
                  <Link
                    to='/dashboard/cart'
                    className={`text-xl font-bold ${activeItem === 'Cart' ? 'text-yellow-400' : 'text-gray-300'} hover:text-teal-400`}
                    onClick={() => handleItemClick('Cart')}
                  >
                    Cart
                  </Link>
                  <hr className='border-gray-700' />
                  {(role === 'admin' || role === 'seller') && (
                    <Link
                      to='/dashboard'
                      className={`text-xl font-bold ${activeItem === 'Dashboard' ? 'text-yellow-400' : 'text-gray-300'} hover:text-teal-400`}
                      onClick={() => handleItemClick('Dashboard')}
                    >
                      Dashboard
                    </Link>
                  )}
                  <hr className='border-gray-700' />
                  {role === 'user' && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className='text-xl font-bold text-gray-300 hover:text-teal-400 flex items-center'
                    >
                      Request To Be Seller
                    </button>
                  )}
                  <hr className='border-gray-700' />
                  {user ? (
                    <button
                      onClick={logOut}
                      className='text-xl font-bold text-gray-300 hover:text-red-500 flex items-center'
                    >
                      <AiOutlineLogout className='mr-2' /> Logout
                    </button>
                  ) : (
                    <Link
                      to='/login'
                      className='text-xl font-bold text-teal-400 hover:text-teal-500'
                    >
                      Join Us
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Transition>
        </Container>
      </div>
      {isModalOpen && <HostModal isOpen={isModalOpen} onClose={closeModal} onSubmit={modalHandle} />}
    </div>
  );
};

export default Navbar;
