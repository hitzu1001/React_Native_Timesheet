import createDateContext from "./createDataContext";
import timesheetApi from "../api/timesheetApi";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      console.log(action.payload)
      return action.payload;
    case "delete_blogpost":
      return state.filter(blogPost => blogPost.id !== action.payload);
    case "edit_blogpost":
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    // const response = await timesheetApi.get("/blogposts");
    // dispatch({ type: "get_blogposts", payload: response.data });
    const response = await timesheetApi.get("/timesheets")
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPost = dispatch => {
  return async (title, notes, startTime, endTime, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.post("/timesheets", { title, startTime, endTime, notes });
    //await timesheetApi.post("/blogposts", { title, startTime, endTime, notes });
  };
};

const deleteBlogPost = dispatch => {
  return async (id, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = dispatch => {
  return async (id, title, notes, startTime, endTime, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.put(`/blogposts/${id}`, {
      title,
      notes,
      notes,
      startTime,
      endTime
    });

    dispatch({
      type: "edit_blogpost",
      payload: { id, title, notes, startTime, endTime}
    });
  };
};

export const { Context, Provider } = createDateContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
