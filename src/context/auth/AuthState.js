import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
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

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    numPages: 0,
    pets: [
      {
        id: 2,
        name: "Garfield",
        image: "https://elasticbeanstalk-ap-southeast-2-671015575440.s3-ap-southeast-2.amazonaws.com/cc-a3/pet_images/username0.png",
        rating: 4.2,
        comments: [
          {
            id: 1,
            user: { id: 1, username: "Test" },
            message: "THis is a coment",
          },
          {
            id: 2,
            user: { id: 1, username: "Test" },
            message: "THis is a chhoment",
          },
          {
            id: 3,
            user: { id: 1, username: "Test" },
            message: "THis isda a coment",
          }
        ]
      },
      {
        id: 2,
        name: "Garfield",
        image: "https://elasticbeanstalk-ap-southeast-2-671015575440.s3-ap-southeast-2.amazonaws.com/cc-a3/pet_images/username0.png",
        rating: 4,
        comments: [
          {
            id: 1,
            user: { id: 1, username: "Test" },
            message: "THis is a coment",
          },
          {
            id: 2,
            user: { id: 1, username: "Test" },
            message: "THis is a chhoment",
          },
          {
            id: 3,
            user: { id: 1, username: "Test" },
            message: "THis isda a coment",
          }
        ]
      },
      
      {
        id: 2,
        name: "Garfield",
        image: "https://elasticbeanstalk-ap-southeast-2-671015575440.s3-ap-southeast-2.amazonaws.com/cc-a3/pet_images/username0.png",
        rating: 4,
        comments: [
          {
            id: 1,
            user: { id: 1, username: "Test" },
            message: "THis is a coment",
          },
          {
            id: 2,
            user: { id: 1, username: "Test" },
            message: "THis is a chhoment",
          },
          {
            id: 3,
            user: { id: 1, username: "Test" },
            message: "THis isda a coment",
          }
        ]
      }
      ,
      {
        id: 2,
        name: "Garfield",
        image: "https://elasticbeanstalk-ap-southeast-2-671015575440.s3-ap-southeast-2.amazonaws.com/cc-a3/pet_images/username0.png",
        rating: 4,
        comments: [
          {
            id: 1,
            user: { id: 1, username: "Test" },
            message: "THis is a coment",
          },
          {
            id: 2,
            user: { id: 1, username: "Test" },
            message: "THis is a chhoment",
          },
          {
            id: 3,
            user: { id: 1, username: "Test" },
            message: "THis isda a coment",
          }
        ]
      }
    ],
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      if (localStorage.token === "") return;
      setAuthToken(localStorage.token);
    } else return;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/user/load",
        { logintoken: localStorage.token },
        config
      );

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    }
  };

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    formData.logintoken = "";

    try {
      const res = await axios.post("/api/user/register", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      });
    }
  };

  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/user/login", formData, config);

      localStorage.token = res.data.logintoken;

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
    }
  };

  const logout = async () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const clearErrors = async () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  const updateUser = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/user/update", id, config);

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: err,
      });
    }
  };

  const clearPets = async () => {
    dispatch({
      type: CLEAR_PETS,
    });
  };

  const addPet = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/pet/add", formData, config);

      dispatch({
        type: PETS_ADD_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PETS_ADD_FAIL,
        payload: err,
      });
    }
  };

  const removePet = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/pet/remove", id, config);

      dispatch({
        type: PETS_REMOVE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PETS_REMOVE_FAIL,
        payload: err,
      });
    }
  };

  const updatePet = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/pet/update", id, config);

      dispatch({
        type: PETS_UPDATE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PETS_UPDATE_FAIL,
        payload: err,
      });
    }
  };

  const addComment = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/pet/comment", id, config);

      dispatch({
        type: PETS_UPDATE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PETS_UPDATE_FAIL,
        payload: err,
      });
    }
  };

  const getPets = async () => {
    try {
      const res = await axios.get("/api/pet/get");

      dispatch({
        type: PETS_GET_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PETS_GET_FAIL,
        payload: err,
      });
    }
  };

  const getRandomPet = async () => {
    try {
      const res = await axios.get("/api/pet/random");

      dispatch({
        type: PETS_GET_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PETS_GET_FAIL,
        payload: err,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        pets: state.pets,
        numPages: state.numPages,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
        updateUser,
        clearPets,
        addPet,
        removePet,
        updatePet,
        getPets,
        getRandomPet,
        addComment
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
