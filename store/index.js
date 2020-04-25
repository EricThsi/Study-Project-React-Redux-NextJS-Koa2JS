import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const initialState = {
  counter: 0,
};

const ADD = 'ADD';
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        counter: state.counter + action.payload.counter,
      };
    default:
      return state;
  }
};
const userInitialState = {};
const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const reducers = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

export const add = (counter) => {
  return {
    type: ADD,
    payload: {
      counter,
    },
  };
};

export const addAsync = (counter) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add(counter));
    }, 1000);
  };
};

export default function initializeStore(state) {
  const store = createStore(
    reducers,
    Object.assign(
      {},
      {
        counter: initialState,
        user: userInitialState,
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
  return store;
}
