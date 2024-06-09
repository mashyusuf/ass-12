import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { imageUpload } from '../../api/utils';

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const image = form.image.files[0];
    
    try {
      setLoading(true);
      // 1. Upload image and get image url
      const image_url = await imageUpload(image)
      console.log(image_url);
      // 2. User Registration
      const result = await createUser(email, password);
      console.log(result);

      // 3. Save username, photo, and role in firebase
      await updateUserProfile(name,  image_url, role);
      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-gray-900 shadow-lg'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold text-purple-600'>Sign Up</h1>
          <p className='text-sm text-gray-500'>Welcome to Our Medicine House</p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block mb-2 text-sm text-gray-600'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-purple-300 focus:outline-none bg-gray-100 text-gray-800'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm text-gray-600'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm text-gray-600'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-purple-300 focus:outline-none bg-gray-100 text-gray-800'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='password' className='text-sm mb-2 text-gray-600'>
                Password
              </label>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-purple-300 focus:outline-none bg-gray-100 text-gray-800'
              />
            </div>
            <div>
              <label htmlFor='role' className='block mb-2 text-sm text-gray-600'>
                Select Role
              </label>
              <select
                name='role'
                id='role'
                required
                className='w-full px-3 py-2 border rounded-md border-purple-300 focus:outline-none bg-gray-100 text-gray-800'
              >
                <option value='user'>User</option>
                <option value='seller'>Seller</option>
              </select>
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-purple-500 w-full rounded-md py-3 text-white hover:bg-purple-600 focus:outline-none'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
          <p className='px-3 text-sm text-gray-600'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer bg-gray-100 hover:bg-gray-200'
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-600'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-purple-600 text-purple-500'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
