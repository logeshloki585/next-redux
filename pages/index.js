import { useEffect, useState } from 'react';
import { useAppSelector } from '../lib/hook';
import { useSelector } from 'react-redux';
import Navbar from '@/components/navbar';

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  // const token = useAppSelector((state) => state.auth.token); 
  const user = useAppSelector((state) => state.UserData.userData);
  console.log(isLoggedIn,user);
  // Ensure client-side only code runs after initial render
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render loading state while checking authentication
  if (!isClient) {
    return <p>Loading...</p>; // Show a loading spinner or placeholder if needed
  }

  // Handle unauthorized access
  if (!isLoggedIn || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-lg w-full p-6 bg-white border border-gray-300 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
          <p className="text-lg mb-4">You are not authorized to view this page. Please log in to access this content.</p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // Render the dashboard if authorized
  return (
    <div className="max-w-2xl mx-auto p-5 border border-gray-300 rounded-lg text-center">
      <Navbar />
      <h1 className="text-2xl mb-5">Welcome to the Dashboard</h1>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;
