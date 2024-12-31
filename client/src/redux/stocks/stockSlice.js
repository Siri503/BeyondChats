import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stocks: [],
  currentStock: null,
  error: null,
  loading: false,
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    // Create stock
    createStockStart: (state) => {
      state.loading = true;
    },
    createStockSuccess: (state, action) => {
      state.stocks.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createStockFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Fetch stock
    fetchStockStart: (state) => {
      state.loading = true;
    },
    fetchStockSuccess: (state, action) => {
      state.stocks = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchStockFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Update stock
    updateStockStart: (state) => {
      state.loading = true;
    },
    updateStockSuccess: (state, action) => {
      const index = state.stocks.findIndex((stock) => stock._id === action.payload._id);
      if (index !== -1) {
        state.stocks[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateStockFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Delete stock
    deleteStockStart: (state) => {
      state.loading = true;
    },
    deleteStockSuccess: (state, action) => {
      state.stocks = state.stocks.filter((stock) => stock._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteStockFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Actions
export const {
  createStockStart,
  createStockSuccess,
  createStockFailure,
  fetchStockStart,
  fetchStockSuccess,
  fetchStockFailure,
  updateStockStart,
  updateStockSuccess,
  updateStockFailure,
  deleteStockStart,
  deleteStockSuccess,
  deleteStockFailure,
} = stockSlice.actions;

export default stockSlice.reducer;
