import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
const initialState = {
  counter: 0,
};

const ADD = 'ADD';
const counterReducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case ADD:
      return {
        counter: state.counter + 1,
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
  applyMiddleware(ReduxThunk)
);
console.log(store.getState());
store.dispatch({
  type: ADD,
});
console.log(store.getState());

console.log(store);

export default store;
