import { createStore } from "@reduxjs/toolkit";

function reducer(state = [{}], action) {
  if (action.type === 'GET_DATA') {
    return action.data
  };
  return state
};


const store = createStore(reducer);

export default store;