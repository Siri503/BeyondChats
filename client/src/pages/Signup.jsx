import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import OAuth from '../components/OAuth';
function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7 text-green-700">
      Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          autoComplete="off"
          id="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          autoComplete="off"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          id="password"
          autoComplete="off"
          onChange={handleChange}
        />
         <button
            disabled={loading}
          className="bg-green-700 text-white p-3 rounded-lg uppercase hover:bg-green-800 disabled:bg-gray-500"
        > {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5 text-gray-700">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700 hover:underline">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
  )
}

export default Signup
