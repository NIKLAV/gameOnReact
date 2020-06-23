const initialState = {
  disableAfterClick: false,
  disable: true,
};

const disableReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISABLE_BUTTONS_AFTER_CLICK":
      if (!state.disableAfterClick) {
        return {
          ...state,
          disableAfterClick: true,
        };
      } else
        return {
          ...state,
          disableAfterClick: false,
        };
    case "DISABLE_BUTTONS_WHILE_RUN":
      if (state.disable) {
        return {
          ...state,
          disable: false,
        };
      } else
        return {
          ...state,
          disable: true,
        };
    default:
      return state;
  }
};

export default disableReducer;
