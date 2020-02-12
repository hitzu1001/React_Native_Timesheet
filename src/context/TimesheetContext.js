import createDateContext from "./createDataContext";
import timesheetApi from "../api/timesheetApi";

const timesheetReducer = (state, action) => {
  switch (action.type) {
    case "get_timesheets":
      return action.payload;
    case "delete_timesheet":
      return state.filter(timesheet => timesheet._id !== action.payload);
    case "edit_timesheet":
      return state.map(timesheet => {
        return timesheet._id === action.payload._id ? action.payload : timesheet;
      });
    default:
      return state;
  }
};

const getTimesheets = dispatch => {
  return async () => {
    const response = await timesheetApi.get("/timesheets");
    dispatch({ type: "get_timesheets", payload: response.data });
  };
};

const addTimesheet = dispatch => {
  return async (startTime, endTime, task, notes, images, status, isTimeOff, callback) => {
    if (callback) {
      callback();
    }

    await timesheetApi.post("/timesheets", {
      startTime, endTime, task, notes, images, status, isTimeOff
    });
  };
};

const deleteTimesheet = dispatch => {
  return async (id, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.delete(`/timesheets/${id}`, { id });
    dispatch({ type: "delete_timesheet", payload: id });
  };
};

const editTimesheet = dispatch => {
  return async (id, startTime, endTime, task, notes, images, status, callback) => {
    await timesheetApi.put(`/timesheets/${id}`, {
      startTime, endTime, task, notes, images, status
    });

    if (callback) {
      callback();
    };

    dispatch({
      type: "edit_timesheet",
      payload: { startTime, endTime, task, notes, images, status }
    });
  };
};

export const { Context, Provider } = createDateContext(
  timesheetReducer,
  { addTimesheet, deleteTimesheet, editTimesheet, getTimesheets },
  []
);
