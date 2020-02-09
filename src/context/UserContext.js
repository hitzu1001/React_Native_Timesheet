import createDataContext from './createDataContext';
import timesheetApi from '../api/timesheetApi';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'get_alluser':
      return action.payload
    default:
      return state;
  }
};

const getAllUser = dispatch => {
  return async () => {
    const response = await timesheetApi.get(`/users`);
    dispatch({ type: "get_alluser", payload: response.data });
  };
};


export const { Context, Provider } = createDataContext(
  userReducer,
  { getAllUser },
  []
);