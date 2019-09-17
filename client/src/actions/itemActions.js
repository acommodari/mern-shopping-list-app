import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => async dispatch => {
  dispatch(setItemsLoading());
  const result = await axios.get('/api/items');
  dispatch({
    type: GET_ITEMS,
    payload: result.data
  });
};

export const addItem = item => async dispatch => {
  const result = await axios.post('/api/items', item);
  dispatch({
    type: ADD_ITEM,
    payload: result.data
  });
};

export const deleteItem = id => async dispatch => {
  await axios.delete(`/api/items/${id}`);
  dispatch({
    type: DELETE_ITEM,
    payload: id
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
