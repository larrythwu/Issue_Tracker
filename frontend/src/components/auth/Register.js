import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../errors/ErrorNotice";

export default function Register() {
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
      const newUser = {
        email,
        password,
        passwordConfirmation,
        displayName,
      };
      // console.log(newUser);
      //register
      const registerRes = await axios.post("users/register", newUser);
      //then login immeditately
      const loginRes = await axios.post("users/login", {
        email,
        password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response.data.message) setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && (
        <ErrorNotice
          message={error}
          clearError={() => {
            setError(undefined);
          }}
        />
      )}
      <form onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-email"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setpasswordConfirmation(e.target.value)}
        />

        <label htmlFor="register-display-name">Name</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
