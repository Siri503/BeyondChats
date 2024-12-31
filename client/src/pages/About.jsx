import { Link } from 'react-router-dom';
function About() {
  return (
    <div className="about-page p-6 max-w-6xl mx-auto">
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">About StockTracker</h1>
        <p className="text-gray-600">Everything you need to know about tracking stock market trends, analyzing real-time data, and staying on top of your investments.</p>
      </section>

      {/* StockTracker Mission */}
      <section className="mission bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
        <p className="text-gray-600">
          At StockTracker, our mission is to empower investors with the tools they need to track, analyze, and make informed decisions about their investments. Whether you're a beginner or an expert, we provide real-time stock data, insights, and trends to help you stay ahead in the market.
        </p>
      </section>

      {/* Features Overview */}
      <section className="features bg-gray-200 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Features Overview</h2>
        <p className="text-gray-600 mb-4">
          Our app provides a range of powerful features designed to make stock tracking easier and more efficient:
        </p>
        <ul className="list-disc ml-4 text-gray-600">
          <li><strong>Track stock prices in real-time</strong>: Monitor price changes, fluctuations, and live data for all major stocks.</li>
          <li><strong>Create a personalized watchlist</strong>: Add your favorite stocks to a custom watchlist and track them all in one place.</li>
          <li><strong>Analyze market trends</strong>: Use advanced charts, analytics, and historical data to understand trends and make data-driven decisions.</li>
          <li><strong>Receive stock alerts</strong>: Get notified when stocks hit specific price points, making it easy to act quickly on market movements.</li>
        </ul>
      </section>

      {/* How It Works */}
      <section className="how-it-works bg-white p-6 rounded-lg mb-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">How It Works</h2>
        <p className="text-gray-600 mb-4">
          Using StockTracker is simple and intuitive. Here is a quick guide on how to get started:
        </p>
        <ol className="list-decimal ml-6 text-gray-600">
          <li><strong>Create an account</strong>: Sign up to get started and personalize your stock watchlist.</li>
          <li><strong>Track stocks</strong>: Search for stocks, view real-time data, and add them to your watchlist for easy monitoring.</li>
          <li><strong>Set alerts</strong>: Set price alerts so you can be notified when stocks move in your favor.</li>
          <li><strong>Analyze trends</strong>: Use our advanced charting tools to study market trends and make smarter investment choices.</li>
        </ol>
      </section>

      {/* Technology Used */}
      <section className="tech bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Technology Behind StockTracker</h2>
        <p className="text-gray-600">
          StockTracker is built using modern technologies to ensure speed, reliability, and scalability. Here is a look at some of the key technologies:
        </p>
        <ul className="list-disc ml-4 text-gray-600">
          <li><strong>React</strong>: A JavaScript library for building dynamic, responsive user interfaces.</li>
          <li><strong>Node.js</strong>: A server-side JavaScript environment used for building fast and scalable applications.</li>
          <li><strong>MongoDB</strong>: A NoSQL database that stores and retrieves data efficiently for a seamless user experience.</li>
          <li><strong>WebSocket</strong>: Real-time communication protocol for delivering live stock price updates.</li>
          <li><strong>Chart.js</strong>: A library for rendering interactive and visually appealing stock charts.</li>
        </ul>
      </section>

      {/* Benefits */}
      <section className="benefits bg-white p-6 rounded-lg mb-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">Why Choose StockTracker?</h2>
        <p className="text-gray-600">
          StockTracker offers several benefits to help you stay ahead of the game:
        </p>
        <ul className="list-disc ml-4 text-gray-600">
          <li><strong>Real-time updates</strong>: Get the latest stock prices and market data as they happen.</li>
          <li><strong>Personalized watchlist</strong>: Keep track of the stocks that matter most to you.</li>
          <li><strong>Advanced analytics</strong>: Make data-driven decisions using powerful market analysis tools.</li>
          <li><strong>Instant alerts</strong>: Never miss a market opportunity with instant notifications on stock movements.</li>
        </ul>
      </section>

      {/* Call to Action */}
      <div className="cta bg-green-100 p-6 text-center rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-green-700">Get Started Today!</h3>
        <p className="text-gray-700 mb-4">Join thousands of investors who trust StockTracker for real-time stock market data and insights.</p>
        <Link to="/sign-up">
          <button className="bg-green-500 text-white px-6 py-2 rounded mt-4 hover:bg-green-700">
            Sign Up Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default About;
