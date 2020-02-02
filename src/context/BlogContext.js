import createDateContext from "./createDataContext";
import timesheetApi from "../api/timesheetApi";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    case "delete_blogpost":
      return state.filter(blogPost => blogPost._id !== action.payload);
    case "edit_blogpost":
      return state.map(blogPost => {
        return blogPost._id === action.payload._id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    // const response = await timesheetApi.get("/blogposts");
    // dispatch({ type: "get_blogposts", payload: response.data });
    const response = await timesheetApi.get("/timesheets");
    // console.log(response)
    dispatch({ type: "get_blogposts", payload: response.data });
    // const response = await timesheetApi.get("/timesheets")
    // dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPost = dispatch => {
  return async (startTime, endTime, task, notes, images, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.post("/timesheets", {
      startTime, endTime, task, notes, images,
    });
    //await timesheetApi.post("/blogposts", { title, startTime, endTime, notes });
  };
};

const deleteBlogPost = dispatch => {
  return async (id, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.delete(`/timesheets/${id}`, { id });
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = dispatch => {
  return async (id, startTime, endTime, task, notes, images, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.put(`/timesheets/${id}`, {
      startTime, endTime, task, notes, images,
    });

    dispatch({
      type: "edit_blogpost",
      payload: { startTime, endTime, task, notes, images, }
    });
  };
};

export const { Context, Provider } = createDateContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
