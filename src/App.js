import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layouts/Navbar";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import User from "./components/pages/User";
import Search from "./components/pages/Search";
import Pet from "./components/pages/Pet";
import AddPet from "./components/pages/AddPet";

import AuthState from "./context/auth/AuthState.js";

const App = () => {
  return (
    <Router>
      <AuthState>
        <div className='App'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/user/:userId' component={User} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/pet/:petId' component={Pet} />
            <Route exact path='/add_pet' component={AddPet} />
          </Switch>
        </div>
      </AuthState>
    </Router>
  );
};

export default App;
