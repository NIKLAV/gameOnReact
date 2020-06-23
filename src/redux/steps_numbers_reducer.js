const initialState = {
  steps: [],
  start: null,
  again: null,
};

const stepsNumbersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STEPS":
      return {
        ...state,
        steps: [...state.steps, action.payload],
      };
    case "RESET_STEPS":
      return {
        ...state,
        steps: [],
      };
    case "START_NUMBER":
      return {
        ...state,
        start: action.payload,
      };
    case "HIDE_TEXT":
      if (!state.again && state.again !== null) {
        return {
          ...state,
          again: true,
        };
      } else
        return {
          ...state,
          again: false,
        };

    default:
      return state;
  }
};

export default stepsNumbersReducer;
