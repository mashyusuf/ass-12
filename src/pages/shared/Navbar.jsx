import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import useAuth from '../../hooks/useAuth';
import Container from './Container';
import avatarImg from '../../assets/placeholder.jpg';
import logo from '../../assets/logo.jpg';
import { FaCartPlus } from "react-icons/fa";
import useCart from '../../hooks/useCart';
import HostModal from '../../Components/Modal/SellerRequestModal';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast'
import useRole from '../../hooks/useRole';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure()
  const [activeItem, setActiveItem] = useState('');
 const [cart] = useCart();
 const [isModalOpen , setIsModalOpen] = useState(false)
 const [role, isLoading] = useRole()
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const closeModal = () =>{
    setIsModalOpen(false)
  }
  const modalHandle = async () => {
    console.log('Yooo I want To Be Seller');
    try {
      const currentUser = {
        email: user?.email,
        role: 'user',
        status: 'Requested',
      };
      const { data } = await axiosSecure.put(`/user`, currentUser);
      console.log(data);
      if (data.modifiedCount > 0) {
        toast.success('Request successfully submitted! Now wait for admin approval.');
      } else {
        toast.success('! Wait for admin approval.');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  if(isLoading) return <span className="loading loading-bars loading-lg"></span>

  return (
    <div className='fixed w-full z-10 shadow-sm' style={{ backgroundColor: '#4B0082' }}>
      <div className='py-4 border-b-[1px] border-gray-300'>
        <Container>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link to='/' className='flex items-center'>
              <img
                src={logo}
                alt='logo'
                width='90'
                height='90'
              />
              <p className='text-2xl font-extrabold text-white'>Medicine House</p>
            </Link>
            {/* Centered components */}
            <div className='hidden md:flex justify-center items-center md:justify-center lg:justify-start'>
              <Link
                to='/'
                className={`mx-4 ${activeItem === 'Home' ? 'text-yellow-500 font-extrabold text-3xl' : 'text-white font-bold text-2xl'} hover:text-pink-500`}
                onClick={() => handleItemClick('Home')}
              >
                Home
              </Link>
              <Link
                to='/shop'
                className={`mx-4 ${activeItem === 'Shop' ? 'text-yellow-500 font-extrabold text-3xl' : 'text-white font-bold text-2xl'} hover:text-green-500`}
                onClick={() => handleItemClick('Shop')}
              >
                Shop
              </Link>
              <Link
                to='/dashboard/cart'
                className={`mx-4 ${activeItem === 'Cart' ? 'text-yellow-500 font-extrabold text-3xl' : 'text-white font-bold'} hover:text-blue-500`}
                onClick={() => handleItemClick('Cart')}
              >
                <button className="btn">
                <FaCartPlus className='text-2xl' />
      <div className="badge badge-secondary">+{cart.length}</div>
          </button>
              </Link>
              <div>
                <select
                  id="language-select"
                  className='p-2 mx-2 text-black'
                  value={selectedLanguage}
                  onChange={handleChange}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                  <option value="jp">Japanese</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              {role === 'admin' && (
                            <>
                            <Link
                to='/dashboard'
                className={`mx-4 ${activeItem === 'Shop' ? 'text-yellow-500 font-extrabold text-3xl' : 'text-white font-bold text-2xl'} hover:text-green-500`}
                onClick={() => handleItemClick('Shop')}
              >
              Dashboard
              </Link>
                            </>
                        )}
              {role === 'seller' && (
                            <>
                            <Link
                to='/dashboard'
                className={`mx-4 ${activeItem === 'Shop' ? 'text-yellow-500 font-extrabold text-3xl' : 'text-white font-bold text-2xl'} hover:text-green-500`}
                onClick={() => handleItemClick('Shop')}
              >
               Dashboard
              </Link>
                            </>
                        )}

            </div>
            {/* Become A Host btn */}
            <div className='hidden md:block'>
             {/* {!user && (*/}
             {role === 'user' && (
                            <>
                            <li>
                            <button
                    onClick={()=> setIsModalOpen(true)}
                      className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-md font-bold bg-cyan-400 rounded-full  transition'
                    >
                     Seller your home
                    </button>
                        </li>
                            </>
                        )}
                    
                 { /*)}*/}
                </div>
                <HostModal isOpen={isModalOpen} closeModal={closeModal} modalHandle={modalHandle}></HostModal>
            {/* Conditional rendering based on user authentication */}
            {user ? (
              // When user is logged in
              <div className='relative'>
                <div className='flex items-center gap-3'>
                  {/* Dropdown btn */}
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                  >
                    <AiOutlineMenu className='text-white' />
                    <div className='hidden md:block'>
                      {/* Avatar */}
                      <img
                        className='rounded-full'
                        referrerPolicy='no-referrer'
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        alt='profile'
                        height='30'
                        width='30'
                      />
                    </div>
                  </div>
                </div>
                {/* Dropdown menu for mobile */}
                {isOpen && (
                  <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-teal-300 overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                      <Link
                        to='/dashboard'
                        className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold ${activeItem === 'Dashboard' ? 'text-yellow-500 font-extrabold text-3xl' : 'text-black font-bold text-xl'} hover:text-purple-500`}
                        onClick={() => handleItemClick('Dashboard')}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to='/profile'
                        className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold ${activeItem === 'UpdateProfile' ? 'text-yellow-500 font-extrabold text-3xl' : 'text-black font-bold text-xl'} hover:text-orange-500`}
                        onClick={() => handleItemClick('UpdateProfile')}
                      >
                        Your Profile
                      </Link>
                      <div
                        onClick={logOut}
                        className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold ${activeItem === 'UpdateProfile' ? 'text-yellow-500 font-extrabold text-3xl' : 'text-black font-bold text-xl'} hover:text-orange-500`}
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // When user is not logged in
              <Link to={'/login'}>
                <button className='btn bg-cyan-600 border-0 mx-2 px-6 text-xl font-bold text-white hover:bg-purple-600'>Join Us</button>
              </Link>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
