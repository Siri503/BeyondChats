import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import {useSelector} from 'react-redux';

function Header() {
  const {currentUser}=useSelector(state => state.user);

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-green-400">Stock</span>
          <span className="text-white">Tracker</span>
        </h1>
        <form className="bg-gray-700 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search stocks..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-white placeholder-gray-400"
          />
          <button className="ml-2">
            <FaSearch className="text-gray-400 hover:text-white" />
          </button>
        </form>
        <ul className="flex gap-6">
          <Link to="/">
            <li className="hidden sm:inline text-gray-400 hover:text-green-400">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-gray-400 hover:text-green-400">About</li>
            </Link>
          <Link to="/profile">
            {currentUser ?(
              <img className="rounded-full h-7 w-7 object-cover"src={currentUser.avatar}alt='profile'/> 
            ):(<li className=' text-slate-700 hover:underline'>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
