import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-5 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to BeyondChats</h1>
      <p className="text-lg text-gray-700">
        Build and integrate chatbots easily for your business.
      </p>

      {!currentUser ? (
        <div className="mt-6">
          <Link to="/sign-in" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90">
            Sign In
          </Link>
          <Link to="/sign-up" className="ml-4 text-blue-600 font-semibold">
            Create an Account
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <Link to="/profile" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:opacity-90">
            Go to Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
