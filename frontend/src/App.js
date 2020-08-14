import React, { useState, useEffect, useLocation } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NavBar from "./components/layout/NavBar";
import AuthOptions from "./components/auth/AuthOptions";
import UserContext from "./context/UserContext";
import Todos from "./components/todos/todos";
import Todo from "./components/todos/todo";
import PrivateRoute from "./components/routes/PrivateRoute";
import NotFound from "./components/pages/NotFound";
import NewTodo from "./components/todos/newTodo";
import TextEditor from "./components/textEditor/textEditor";
import axios from "axios";
import "react-quill/dist/quill.snow.css"; // ES6

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
      }
    };

    checkLoggedIn();
  }, [userData.token]);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <AuthOptions />
          <Route exact path="/home" component={Home} />
          <PrivateRoute exact path="/todos" component={Todos} />
          <PrivateRoute exact path="/todos/:todoId" component={Todo} />
          <PrivateRoute exact path="/newTodo" component={NewTodo} />
          <PrivateRoute exact path="/todos" component={TextEditor} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
