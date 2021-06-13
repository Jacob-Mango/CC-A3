import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_NOT_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
  USER_GET_PETS_SUCCESS,
  USER_GET_PETS_FAIL,
  USER_GET_RATED_PETS_SUCCESS,
  USER_GET_RATED_PETS_FAIL,
  CLEAR_PETS,
  PETS_LOADING,
  PETS_ADD_SUCCESS,
  PETS_ADD_FAIL,
  PETS_REMOVE_SUCCESS,
  PETS_REMOVE_FAIL,
  PETS_UPDATE_SUCCESS,
  PETS_UPDATE_FAIL,
  PETS_GET_SUCCESS,
  PETS_GET_FAIL,
  PET_GET_SUCCESS,
  PET_GET_FAIL,
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
    case USER_GET_FAIL:
    case USER_GET_PETS_FAIL:
    case USER_GET_RATED_PETS_FAIL:
    case PETS_REMOVE_FAIL:
    case PETS_UPDATE_FAIL:
    case PETS_GET_FAIL:
    case PET_GET_FAIL:
    case USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_GET_SUCCESS:
      return {
        ...state,
        viewingUser: action.payload,
      };
    case USER_GET_PETS_SUCCESS:
      return {
        ...state,
        viewingUser: { ...state.viewingUser, pets: action.payload.pets }
      };
    case USER_GET_RATED_PETS_SUCCESS:
      return {
        ...state,
        viewingUser: { ...state.viewingUser, rated: action.payload.pets }
      };
    case PETS_LOADING:
      return {
        ...state,
        loadingPets: action.payload,
      };
    case PETS_GET_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loadingPets: false,
        pets: action.payload.pets,
        numPages: action.payload.numPages
      };
    case PET_GET_SUCCESS:
      return {
        ...state,
        loadingPets: false,
        pets: [...state.pets, action.payload]
      };
    case PETS_UPDATE_SUCCESS:
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loadingPets: false,
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
    case USER_NOT_LOADED:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
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
    case PETS_ADD_SUCCESS:
      return {
        ...state,
        loadingPets: false,
      };
    case PETS_REMOVE_SUCCESS:
    case CLEAR_PETS:
      return {
        ...state,
        loadingPets: false,
        pets: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
