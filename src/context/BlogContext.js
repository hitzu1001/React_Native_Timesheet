import createDateContext from './createDataContext';
import timesheetApi from '../api/timesheetApi';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;
    case 'delete_blogpost':
      return state.filter(blogPost => blogPost.id !== action.payload);
    case 'edit_blogpost':
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  };
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await timesheetApi.get('/blogposts');

    dispatch({ type: 'get_blogposts', payload: response.data })
  }
}

const addBlogPost = dispatch => {
  return async (title, notes, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.post('/blogposts', { title, notes });
  };
};

const deleteBlogPost = dispatch => {
  return async (id, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.delete(`/blogposts/${id}`);
    dispatch({ type: 'delete_blogpost', payload: id });
  };
};

const editBlogPost = dispatch => {
  return async (id, title, notes, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.put(`/blogposts/${id}`, { title, notes });
    dispatch({ type: 'edit_blogpost', payload: { id, title, notes } });
  };
};

export const { Context, Provider } = createDateContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);