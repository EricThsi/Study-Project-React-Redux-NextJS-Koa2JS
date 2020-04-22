import { createStore } from 'redux';
const initialState = {
  count: 0,
};

const ADD = 'ADD';
const reducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case ADD:
      return {
        count: state.count + 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);
console.log(store.getState());
store.dispatch({
  type: ADD,
});
console.log(store.getState());

console.log(store);

export default store;
