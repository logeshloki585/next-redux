import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../lib/features/auth/authSlice';
import { clearUserData } from '../lib/features/auth/userSlice';
import { FaUserCircle } from 'react-icons/fa'; // Importing an example icon from react-icons

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.userData);

  const handleLogin = () => {
    router.push('/login'); 
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserData());
    router.push('/'); // Navigate to the home page or any other page after logout
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center relative">
      <div className="flex items-center space-x-4">
        <a href="/" className="text-lg font-semibold hover:text-gray-400">Home</a>
        <a href="/about" className="text-lg font-semibold hover:text-gray-400">About</a>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <span className="text-lg">{user?.name || 'User'}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
          >
            Login
          </button>
        )}
      </div>
      <div className="absolute top-2 right-2">
        <FaUserCircle className="text-2xl cursor-pointer hover:text-gray-400" />
      </div>
    </nav>
  );
};

export default Navbar;
