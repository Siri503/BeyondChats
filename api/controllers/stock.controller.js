import Stock from '../models/Stock.model.js';

export const createStocking = async (req, res, next) => {
  try {
    const stock = await Stock.create(req.body);
    return res.status(201).json(stock);
  } catch (error) {
    console.error('Error creating stock:', error);  // Log error for debugging
    next(error);  // Pass the error to error handling middleware
  }
};
