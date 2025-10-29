import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Task Manager</h1>
        <p className="text-xl mb-8">Organize your tasks efficiently</p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;