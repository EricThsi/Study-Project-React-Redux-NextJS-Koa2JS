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

const store = createStore(
  reducers,
  {
    counter: initialState,
  },
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
