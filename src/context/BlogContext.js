import createDateContext from './createDataContext';
import timesheetApi from '../api/timesheetApi';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;
    // case 'add_blogpost':
    //   return [
    //     ...state,
    //     {
    //       id: uuid(),
    //       // id: Math.floor(Math.random() * 99999),
    //       title: action.payload.title,
    //       content: action.payload.content
    //     }
    //   ];
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
  return async (title, content, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.post('/blogposts', { title, content });
    // dispatch({ type: 'add_blogpost', payload: { title, content } });
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    await timesheetApi.delete(`/blogposts/${id}`);
    dispatch({ type: 'delete_blogpost', payload: id });
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    if (callback) {
      callback();
    }
    await timesheetApi.put(`/blogposts/${id}`, { title, content });
    dispatch({ type: 'edit_blogpost', payload: { id, title, content } });
  };
};

export const { Context, Provider } = createDateContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);