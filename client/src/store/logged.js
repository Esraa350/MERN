const initialState = {
  id: "",
  name: "",
};
const Logging = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        id: action.payload.user._id,
        name: action.payload.user.username,
      };
    case "LOGOUT":
      return {
        ...state,
        id: "",
        name: "",
      };
    default:
      return state;
  }
};
export default Logging;