const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const BUY_CAKE = "BUY_CAKE";

function buyCake() {
  return {
    type: BUY_CAKE
  };
}

const initialCakeState = {
  cakeCount: 10
};
const initialBiscuitState = {
  biscuitCount: 10
};
function buyCakeReducer(state = initialCakeState, action) {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        cakeCount: state.cakeCount - 1
      };
    default:
      return state;
  }
}
function buyBiscuitReducer(state = initialBiscuitState, action) {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        cakeCount: state.biscuitCount - 1
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({ buyCakeReducer, buyBiscuitReducer });
const store = createStore(rootReducer);

console.log("initial State ", store.getState());

const unsubs = store.subscribe(() =>
  console.log("updated state ", store.getState())
);

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
