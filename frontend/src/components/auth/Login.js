import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../errors/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setpasswordConfirmation] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    try {
      //disable input
      e.preventDefault();
      const loginUser = {
        email,
        password,
      };
      // console.log(newUser);
      //Login
      const loginRes = await axios.post("users/Login", loginUser);
      localStorage.setItem("auth-token", loginRes.data.token);

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      history.push("/todos");
    } catch (err) {
      if (err.response.data.message) setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      {error && (
        <ErrorNotice
          message={error}
          clearError={() => {
            setError(undefined);
          }}
        />
      )}
      <form onSubmit={submit}>
        <label htmlFor="Login-email">Email</label>
        <input
          id="Login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="Login-password">Password</label>
        <input
          id="Login-email"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
