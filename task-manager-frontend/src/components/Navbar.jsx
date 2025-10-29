import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileModal from './profileModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
    // Force a re-render by updating the auth context
    window.location.reload(); // Simple way to refresh user data
  };

  return (
    <>
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Task Manager
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Profile Picture Button */}
              <button
                onClick={() => setShowProfileModal(true)}
                className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 transition-all duration-200 group"
              >
                {currentUser?.profilePicture ? (
                  <img
                    src={currentUser.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200 group-hover:border-indigo-400 transition"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold border-2 border-indigo-200 group-hover:border-indigo-400 transition">
                    {currentUser?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                
                <div className="hidden sm:block text-left">
                  <p className="text-sm text-gray-500">Welcome back,</p>
                  <p className="text-sm font-semibold text-gray-800">{currentUser?.name}</p>
                </div>
              </button>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showProfileModal && (
        <ProfileModal
          onClose={() => setShowProfileModal(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </>
  );
};

export default Navbar;