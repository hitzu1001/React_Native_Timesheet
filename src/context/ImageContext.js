import createDateContext from "./createDataContext";

const imageReducer = (state, action) => {
  switch (action.type) {
    // case "get_images":
    //   return action.payload;
    case 'add_image':
      return [...state, action.payload];
    case "delete_image":
      return state.filter(image => image.uri !== action.payload);
    case "edit_image":
      return state.map(image => {
        return image.uri === action.payload.uri ? action.payload : image;
      });
    default:
      return state;
  }
};

// const getImages = dispatch => {
//   return (images) => {
//     dispatch({ type: "get_images", payload: images });
//   };
// };

const addImage = dispatch => {
  return (uri, comment) => {
    dispatch({ type: "add_images", payload: { uri, comment } });
  };
};

const deleteImage = dispatch => {
  return (uri) => {
    dispatch({ type: "delete_image", payload: uri });
  };
};

const editImage = dispatch => {
  return (image) => {
    dispatch({
      type: "edit_image", payload: image
    });
  };
};

export const { Context, Provider } = createDateContext(
  imageReducer,
  { addImage, deleteImage, editImage },
  [{uri: '' , comment: '123'},]
);