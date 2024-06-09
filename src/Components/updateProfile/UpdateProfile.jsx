import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile(name, photoURL);
      navigate('/profile'); // Navigate back to the profile page after updating
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <div className='bg-gray-200 shadow-lg rounded-2xl w-3/5 p-6'>
        <h2 className='text-2xl font-bold text-center mb-4'>Update Profile</h2>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Name</label>
            <input
              type='text'
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Photo URL</label>
            <input
              type='text'
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500'
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-purple-500 px-10 py-2 rounded-lg text-white hover:bg-purple-700'
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
