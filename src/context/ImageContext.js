import createDateContext from "./createDataContext";

const imageReducer = (state, action) => {
  switch (action.type) {
    case "set_images":
      return action.payload;
    case "add_image":
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

const setImages = dispatch => images => {
  dispatch({ type: "set_images", payload: images });
};

const addImage = dispatch => uri => {
  dispatch({ type: "add_image", payload: { uri, comment: "" } });
};

const deleteImage = dispatch => uri => {
  dispatch({ type: "delete_image", payload: uri });
};

const editImage = dispatch => (uri, comment) => {
  dispatch({ type: "edit_image", payload: { uri, comment } });
};

export const { Context, Provider } = createDateContext(
  imageReducer,
  { setImages, addImage, deleteImage, editImage },
  []
);
