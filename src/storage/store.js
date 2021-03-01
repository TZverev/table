import { combineReducers, createStore } from "@reduxjs/toolkit";

function data(state = [], action) {
  if (action.type === 'GET_DATA') {
    return action.data
  };
  if (action.type === 'SORT_DATA') {
    return action.data
  };
  return state
};

function filter(state = '', action) {
  if (action.type === 'SAVE_FILTER') {
    return action.filter
  };
  return state
};

function isLoading(state = false, action) {
  if (action.type === 'LOADING_START') {
    return true
  };
  if (action.type === 'LOADING_FINISHED') {
    return false
  };
  return state
};

function currentPage(state = 0, action) {
  if (action.type === 'NEXT_PAGE') {
    return state + 1;
  };
  if (action.type === 'PREVIOUS_PAGE') {
    if (state === 0) {
      return 0;
    }
    return state - 1;
  };
  if (action.type === 'FIRST_PAGE') {
    return 0;
  }
  return state
};


const reducers = combineReducers({
  data,
  filter,
  isLoading,
  currentPage,
})

const store = createStore(reducers);

export default store;