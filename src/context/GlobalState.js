import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  transactions: []
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const getTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/transactions');
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTransaction = async id => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/transactions/${id}`
      );
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: res.data.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addTransaction = async transaction => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/transactions',
        transaction
      );
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        getTransactions,
        addTransaction,
        deleteTransaction,
        transactions: state.transactions
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
