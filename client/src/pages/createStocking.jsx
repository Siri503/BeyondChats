import { useState } from 'react';
import { useSelector } from 'react-redux';

const CreateStocking = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    price: 0,
    quantity: 1,
    description: '',
    category: 'Others', // Default category
  });
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Validation for price and quantity
    if (id === 'price' || id === 'quantity') {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue) || parsedValue < 0) return;
    }
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!currentUser) {
      setError('You must be logged in to create a stock.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/stocks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.status === 401) {
        setError('Unauthorized. Please log in again.');
        return;
      }

      if (!data.success) {
        setError(data.message || 'Failed to create stock.');
      } else {
        setSuccess('Stock created successfully!');
        // Reset form
        setFormData({
          name: '',
          symbol: '',
          price: 0,
          quantity: 1,
          description: '',
          category: 'Others',
        });
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">Create New Stock</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Stock Name */}
          <div>
            <label htmlFor="name" className="block font-semibold">Stock Name</label>
            <input
              id="name"
              type="text"
              className="p-2 w-full border rounded-lg"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Stock Symbol */}
          <div>
            <label htmlFor="symbol" className="block font-semibold">Stock Symbol</label>
            <input
              id="symbol"
              type="text"
              className="p-2 w-full border rounded-lg"
              value={formData.symbol}
              onChange={handleChange}
              required
            />
          </div>

          {/* Stock Price */}
          <div>
            <label htmlFor="price" className="block font-semibold">Price</label>
            <input
              id="price"
              type="number"
              className="p-2 w-full border rounded-lg"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label htmlFor="quantity" className="block font-semibold">Quantity</label>
            <input
              id="quantity"
              type="number"
              className="p-2 w-full border rounded-lg"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-semibold">Description</label>
            <textarea
              id="description"
              className="p-2 w-full border rounded-lg"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block font-semibold">Category</label>
            <select
              id="category"
              className="p-2 w-full border rounded-lg"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Tech">Tech</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Energy">Energy</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Stock'}
            </button>
          </div>

          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateStocking;
