import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GRID_SIDE": {
      return {
        ...state,
        grid_side: action.payload.grid_side,
      };
    }
    default:
      return state;
  }
};

const initialState = {
  grid_side: 10,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ globalState: state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
