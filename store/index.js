import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
const userInitialState = {};

const LOGOUT = 'LOGOUT';

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};

const reducers = combineReducers({
  user: userReducer,
});

export const logout = () => {
  return (dispatch) => {
    axios
      .post('/logout')
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: LOGOUT,
          });
        } else {
          console.log('Logout failed'.res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default function initializeStore(state) {
  const store = createStore(
    reducers,
    Object.assign(
      {},
      {
        user: userInitialState,
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
  return store;
}
