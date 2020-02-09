import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import timesheetApi from '../api/timesheetApi';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'signout':
      return { errorMessage: '', token: null };
    case 'get_user':
      return action.payload
    case 'get_alluser':
      return action.payload
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  const email = await AsyncStorage.getItem('email');
  if (token) {
    const response = await timesheetApi.get(`/users/${email}`);
    dispatch({ type: 'signin', payload: 'token' });
    dispatch({ type: "get_user", payload: response.data });
    navigate('Overview');
  } else {
    navigate('Signin');
  }
}

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
}

const signup = dispatch => async ({ email, password, firstName, lastName, role }) => {
  // Try to signup
  try {
    const response = await timesheetApi.post('/signup', { email, password, firstName, lastName, role });
    // Handle success by updating state
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('email', email);
    dispatch({ type: 'signin', payload: response.data.token });
    //Navigate to main flow
    navigate('Overview');
    // Handle failure by showing error message
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  // Try to signin
  try {
    const response = await timesheetApi.post('/signin', { email, password });
    // Handle success by updating state
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('email', email);
    const responseUser = await timesheetApi.get(`/users/${email}`);
    dispatch({ type: 'signin', payload: response.data.token });
    dispatch({ type: "get_user", payload: responseUser.data });
    //Navigate to main flow
    navigate('Overview');
    // Handle failure by showing error message
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
    });
  }
};


const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('email');
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

const getUser = dispatch => {
  return async () => {
    const email = await AsyncStorage.getItem('email');
    const response = await timesheetApi.get(`/users/${email}`);
    dispatch({ type: "get_user", payload: response.data });
  };
};

const getAllUser = dispatch => {
  return async () => {
    const response = await timesheetApi.get(`/users`);
    dispatch({ type: "get_alluser", payload: response.data });
  };
};


export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout, getUser, getAllUser, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '', firstName: '', lastName: '', role: '' }
);