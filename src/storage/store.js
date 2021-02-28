import { combineReducers, createStore } from "@reduxjs/toolkit";

function data(state = [], action) {
  if (action.type === 'GET_DATA') {
    return action.data
  }
  if (action.type === 'SORT_DATA') {
    return action.data
  }
  return state
};

function filter(state = '', action) {
  if (action.type === 'SAVE_FILTER') {
    return action.filter
  }
  return state
}

function isLoading(state = false, action) {
  if (action.type === 'LOADING_START') {
    return true
  }
  if (action.type === 'LOADING_FINISHED') {
    return false
  }

  return state
}

const reducers = combineReducers({
  data,
  filter,
  isLoading,
})

const store = createStore(reducers);

export default store;