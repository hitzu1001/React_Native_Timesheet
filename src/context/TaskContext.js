import createDateContext from "./createDataContext";
import timesheetApi from "../api/timesheetApi";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "get_taskList":
      return action.payload;
    case "delete_task":
      return state.filter(t => t._id !== action.payload);
    case "edit_task":
      return state.map(t => {
        return t._id === action.payload._id ? action.payload : t;
      });
    default:
      return state;
  }
};

const getTaskList = dispatch => {
  return async () => {
    const response = await timesheetApi.get("/tasks");
    dispatch({ type: "get_taskList", payload: response.data });
  };
};

const addTask = () => {
  return async (name, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.post("/tasks", { name });
  };
};

const deleteTask = dispatch => {
  return async (id, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.delete(`/tasks/${id}`, { id });
    dispatch({ type: "delete_task", payload: id });
  };
};

const editTask = dispatch => {
  return async (id, name, callback) => {
    await timesheetApi.put(`/tasks/${id}`, { name });
    if (callback) {
      callback();
    };
    dispatch({ type: "edit_task", payload: name });
  };
};

export const { Context, Provider } = createDateContext(
  taskReducer,
  { getTaskList, addTask, deleteTask, editTask },
  []
);
