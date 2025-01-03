import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = ({ onNavigate, onSearch }) => {
  return (
    <div className="bg-gray-200 p-4 shadow-lg w-64">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <button
            className="text-blue-700 hover:underline"
            onClick={() => onNavigate('create')}
          >
            Create Stock
          </button>
        </li>
        <li>
          <button
            className="text-blue-700 hover:underline"
            onClick={() => onNavigate('view')}
          >
            View Stocks
          </button>
        </li>
        <li>
          <button
            className="text-blue-700 hover:underline"
            onClick={() => onNavigate('search')}
          >
            Search Stock
          </button>
        </li>
      </ul>
    </div>
  );
};

const CreateStocking = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    price: 0,
    quantity: 1,
    description: '',
    category: 'Others',
  });
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentView, setCurrentView] = useState('create');
  const [stocks, setStocks] = useState([]); // To store created stocks
  const [searchQuery, setSearchQuery] = useState('');
  const [stockDetails, setStockDetails] = useState(null); // Store the stock data
  const [apiError, setApiError] = useState('');

  const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'price' || id === 'quantity') {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue) || parsedValue < 0) return;
    }
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!currentUser) {
      setError('You must be logged in to create a stock.');
      setLoading(false);
      return;
    }

    const newStock = { ...formData, id: Date.now() };
    setStocks([...stocks, newStock]);
    setSuccess('Stock created successfully!');
    setFormData({
      name: '',
      symbol: '',
      price: 0,
      quantity: 1,
      description: '',
      category: 'Others',
    });
    setLoading(false);
  };

  const handleDelete = (id) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  const handleEdit = (stock) => {
    setFormData(stock);
    setCurrentView('create');
    setStocks(stocks.filter((s) => s.id !== stock.id));
  };

  // Fetch stock data from Alpha Vantage API when search query changes
  useEffect(() => {
    if (searchQuery) {
      setApiError('');
      const fetchStockData = async () => {
        try {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${searchQuery}&apikey=${ALPHA_VANTAGE_API_KEY}`
          );
          const data = await response.json();
          if (data['Time Series (Daily)']) {
            const stockData = Object.keys(data['Time Series (Daily)']).map((key) => ({
              date: key,
              open: data['Time Series (Daily)'][key]['1. open'],
              high: data['Time Series (Daily)'][key]['2. high'],
              low: data['Time Series (Daily)'][key]['3. low'],
              close: data['Time Series (Daily)'][key]['4. close'],
              volume: data['Time Series (Daily)'][key]['5. volume'],
            }));
            setStockDetails(stockData);
          } else {
            setApiError('No data found for the given symbol');
          }
        } catch (error) {
          setApiError('Error fetching data');
        }
      };

      fetchStockData();
    } else {
      setStockDetails(null);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex">
      <Dashboard onNavigate={setCurrentView} onSearch={setSearchQuery} />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        {currentView === 'create' && (
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">Create New Stock</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-semibold">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="symbol" className="block font-semibold">Symbol</label>
                <input
                  type="text"
                  id="symbol"
                  value={formData.symbol}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block font-semibold">Price</label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block font-semibold">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block font-semibold">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="category" className="block font-semibold">Category</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                >
                  <option value="Tech">Tech</option>
                  <option value="Finance">Finance</option>
                  <option value="Health">Health</option>
                  <option value="Energy">Energy</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Stock'}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {success && <p className="text-green-500 mt-2">{success}</p>}
            </form>
          </div>
        )}

        {currentView === 'view' && (
          <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">Available Stocks</h1>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-2">Name</th>
                  <th className="border border-gray-200 p-2">Symbol</th>
                  <th className="border border-gray-200 p-2">Price</th>
                  <th className="border border-gray-200 p-2">Category</th>
                  <th className="border border-gray-200 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.id} className="text-center">
                    <td className="border border-gray-200 p-2">{stock.name}</td>
                    <td className="border border-gray-200 p-2">{stock.symbol}</td>
                    <td className="border border-gray-200 p-2">{stock.price}</td>
                    <td className="border border-gray-200 p-2">{stock.category}</td>
                    <td className="border border-gray-200 p-2">
                      <button
                        onClick={() => handleEdit(stock)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(stock.id)}
                        className="text-red-500 hover:underline ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentView === 'search' && (
          <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">Search Stock</h1>
            <input
              type="text"
              placeholder="Enter Stock Symbol"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            />
            {apiError && <p className="text-red-500">{apiError}</p>}
            {stockDetails && (
              <div>
                <h2 className="text-xl font-semibold">Stock Data</h2>
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 p-2">Date</th>
                      <th className="border border-gray-200 p-2">Open</th>
                      <th className="border border-gray-200 p-2">High</th>
                      <th className="border border-gray-200 p-2">Low</th>
                      <th className="border border-gray-200 p-2">Close</th>
                      <th className="border border-gray-200 p-2">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockDetails.slice(0, 5).map((data) => (
                      <tr key={data.date}>
                        <td className="border border-gray-200 p-2">{data.date}</td>
                        <td className="border border-gray-200 p-2">{data.open}</td>
                        <td className="border border-gray-200 p-2">{data.high}</td>
                        <td className="border border-gray-200 p-2">{data.low}</td>
                        <td className="border border-gray-200 p-2">{data.close}</td>
                        <td className="border border-gray-200 p-2">{data.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStocking;
