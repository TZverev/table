import { combineReducers, createStore } from "@reduxjs/toolkit";

let initialState = {
  state: [],
  isLoading: false,
  error: false,
}

function data(state = initialState, action) {
  if (action.type === 'REQUESTED_DATA') {
    return {
      state: [],
      isLoading: true,
      error: false,
    };
  };

  if (action.type === 'REQUESTED_DATA_SUCCEEDED') {
    return {
      state: action.data,
      isLoading: false,
      error: false,
    };
  };

  if (action.type === 'REQUESTED_DATA_FAILED') {
    return {
      state: [],
      isLoading: false,
      error: true,
    };
  };

  if (action.type === 'SORT_DATA') {
    return {
      state: action.data,
      isLoading: false,
      error: false,
    }
  };
  return state
};

function filter(state = '', action) {
  if (action.type === 'SAVE_FILTER') {
    return action.filter
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
  currentPage,
})

const store = createStore(reducers);

export default store;