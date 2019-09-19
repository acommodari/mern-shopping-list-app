import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => async dispatch => {
  dispatch(setItemsLoading());
  try {
    const result = await axios.get('/api/items');
    dispatch({
      type: GET_ITEMS,
      payload: result.data
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const addItem = item => async (dispatch, getState) => {
  try {
    const result = await axios.post('/api/items', item, tokenConfig(getState));
    dispatch({
      type: ADD_ITEM,
      payload: result.data
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const deleteItem = id => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/items/${id}`, tokenConfig(getState));
    dispatch({
      type: DELETE_ITEM,
      payload: id
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
