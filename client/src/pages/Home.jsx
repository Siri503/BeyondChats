import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page p-6 max-w-6xl mx-auto">
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Welcome to StockTracker!</h1>
        <p className="text-gray-600">Your ultimate platform for tracking stock market trends and updates.</p>
      </section>

      {/* Introduction to StockTracker */}
      <section className="intro p-6 bg-gray-100 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800">What is StockTracker?</h2>
        <p className="text-gray-600">
          StockTracker is your go-to platform for monitoring stock market trends, analyzing real-time data, and staying
          ahead of market fluctuations. Whether you are a seasoned investor or just getting started, we have everything you
          need to take control of your investments.
        </p>
      </section>

      {/* Interactive Stock Demo */}
      <section className="stock-demo bg-gray-200 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Track Real-Time Stock Prices</h2>
        <p className="text-gray-600 mb-4">
          Get a glimpse of how our platform helps you stay updated with real-time stock price movements.
        </p>
        <div className="stock-demo-container flex justify-center items-center p-4 bg-white shadow-md rounded-lg">
          <p className="text-xl font-bold text-green-500">NASDAQ: +1.25%</p>
          <p className="text-xl font-bold text-red-500 ml-4">S&P 500: -0.45%</p>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="testimonials p-6 bg-gray-100 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-gray-700">What Our Users Are Saying</h2>
        <div className="testimonial-cards grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="testimonial-card bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600">"StockTracker has completely transformed the way I monitor the market. It’s easy to use and gives me real-time insights that I can trust."</p>
            <p className="mt-2 text-gray-800 font-semibold">John Doe</p>
          </div>
          <div className="testimonial-card bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600">"I love how StockTracker helps me stay on top of my investments. The app is fast and responsive!"</p>
            <p className="mt-2 text-gray-800 font-semibold">Jane Smith</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="cta bg-green-100 p-6 text-center rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-green-700">Take Charge of Your Investments Today!</h3>
        <p className="text-gray-700 mb-4">Join a community of savvy investors and stay ahead in the market.</p>
        {/* Link to About Page */}
        <Link to="/about">
          <button className="bg-green-500 text-white px-6 py-2 rounded mt-4 hover:bg-green-700">
            Explore Features
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
