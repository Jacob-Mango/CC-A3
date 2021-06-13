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
  USER_NOT_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
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
    loading: true,
    loadingPets: false,
    error: null,
    numPages: 0,
    pets: []
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    console.log("Load User");

    let attemptLoadUser = false;

    if (localStorage.token && localStorage.token !== "") {
      setAuthToken(localStorage.token);
      attemptLoadUser = true;
    }

    if (!attemptLoadUser) {
      localStorage.removeItem("token");

      dispatch({
        type: USER_NOT_LOADED
      });
      return;
    }

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
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: AUTH_ERROR,
        payload: message,
      });
    }
  };

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/user/register", formData, config);

      localStorage.token = res.data.logintoken;
      setAuthToken(localStorage.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: REGISTER_FAIL,
        payload: message,
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
      setAuthToken(localStorage.token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: LOGIN_FAIL,
        payload: message,
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

  const updateUserBio = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/user/update/bio", formData, config);

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: USER_UPDATE_FAIL,
        payload: message,
      });
    }
  };

  const updateUserEmail = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/user/update/email", formData, config);

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: USER_UPDATE_FAIL,
        payload: message,
      });
    }
  };

  const setPetsLoading = async (data) => {
    dispatch({
      type: PETS_LOADING,
      payload: data,
    });
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
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: PETS_ADD_FAIL,
        payload: message,
      });
    }
  };

  const removePet = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/pet/remove", formData, config);

      dispatch({
        type: PETS_REMOVE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: PETS_REMOVE_FAIL,
        payload: message,
      });
    }
  };

  const updatePetRating = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/user/pets/rate", formData, config);

      console.log(res);

      dispatch({
        type: PETS_UPDATE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: PETS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

  const addComment = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/pet/comment", formData, config);

      dispatch({
        type: PETS_UPDATE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: PETS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

  const searchPets = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    setPetsLoading(true);

    try {
      const res = await axios.post("/api/pet/search", formData, config);

      dispatch({
        type: PETS_GET_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: PETS_GET_FAIL,
        payload: message,
      });
    }
  };

  const getPet = async (id) => {
    setPetsLoading(true);
    
    try {
      const res = await axios.get("/api/pet", {
        params: {
          pet: id
        }
      });

      dispatch({
        type: PET_GET_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: PET_GET_FAIL,
        payload: message,
      });
    }
  };

  const getRandomPet = async () => {
    setPetsLoading(true);

    try {
      const res = await axios.get("/api/pet/random");

      console.log(res.data);

      dispatch({
        type: PET_GET_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let message = err;
      if (err.response !== undefined) {
        message = err.response.data;
      }

      dispatch({
        type: PET_GET_FAIL,
        payload: message,
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
        loadingPets: state.loadingPets,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
        updateUserEmail,
        updateUserBio,
        setPetsLoading,
        clearPets,
        addPet,
        removePet,
        updatePetRating,
        searchPets,
        getPet,
        getRandomPet,
        addComment
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
