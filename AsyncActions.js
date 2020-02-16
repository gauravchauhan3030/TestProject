const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").default;

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

const initialState = {
  users: [],
  loading: false,
  error: ""
};
const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST
  };
};

const fetchUserSuccess = user => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user
  };
};
const fetchUserFailure = error => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error
  };
};

const asynReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ""
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return state;
  }
};

const fetchData = () => {
  return function(dispatch) {
    dispatch(fetchUserRequest());
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        userId: 109,
        id: 94,
        title: "qui qui voluptates illo iste minima",
        body:
          "aspernatur expedita soluta quo ab ut similique\nexpedita dolores amet\nsed temporibus distinctio magnam saepe deleniti\nomnis facilis nam ipsum natus sint similique omnis"
      })
      .then(res => {
        const user = res.data;
        console.log(user);
        dispatch(fetchUserSuccess(user));
      })
      .catch(err => dispatch(fetchUserFailure(err)));
  };
};

const store = createStore(asynReducer, applyMiddleware(thunkMiddleware));

store.dispatch(fetchData());
setTimeout(() => console.log(store.getState()), 3000);
