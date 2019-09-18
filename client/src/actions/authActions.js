import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

// Check token & load user
export const loadUser = () => async (dispatch, getState) => {
  // User laoding
  dispatch({ type: USER_LOADING });

  try {
    const result = await axios.get('/api/auth/user', tokenConfig(getState));
    dispatch({ type: USER_LOADED, payload: result.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });
  try {
    const result = await axios.post('/api/users', config, body);
    dispatch({ type: REGISTER_SUCCESS, payload: result.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    dispatch({ type: REGISTER_FAIL });
  }
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // If token then add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
