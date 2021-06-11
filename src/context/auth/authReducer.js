import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  CLEAR_PETS,
  PETS_ADD_SUCCESS,
  PETS_ADD_FAIL,
  PETS_REMOVE_SUCCESS,
  PETS_REMOVE_FAIL,
  PETS_UPDATE_SUCCESS,
  PETS_UPDATE_FAIL,
  PETS_GET_SUCCESS,
  PETS_GET_FAIL,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case PETS_ADD_FAIL:
    case PETS_REMOVE_FAIL:
    case PETS_UPDATE_FAIL:
    case PETS_GET_FAIL:
    case USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PETS_ADD_SUCCESS:
    case PETS_UPDATE_SUCCESS:
    case PETS_GET_SUCCESS:
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
      };
    case PETS_REMOVE_SUCCESS:
    case CLEAR_PETS:
      return {
        ...state,
        pets: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
