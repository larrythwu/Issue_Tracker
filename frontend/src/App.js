import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";
import AuthOptions from "./components/auth/AuthOptions";
import UserContext from "./context/UserContext";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  //if there is a user logged in, then provide its id to all the
  //components
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      // console.log(token);
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });

      if (tokenRes.data) {
        const userRes = await axios.get("users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
        // console.log(token);
        // console.log(userRes.data);
        // console.log(userData);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <AuthOptions />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
