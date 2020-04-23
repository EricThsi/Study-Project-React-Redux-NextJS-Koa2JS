import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const initialState = {
  counter: 0,
};

const ADD = 'ADD';
const counterReducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case ADD:
      return {
        counter: state.counter + action.payload.counter,
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  counter: counterReducer,
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
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
  return store;
}
