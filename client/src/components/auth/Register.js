import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../errors/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState();
  const [teamNumber, setTeamNumber] = useState();

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
        teamNumber,
        password,
        passwordConfirmation,
        displayName,
      };
      // console.log(newUser);
      //register
      const registerRes = await axios.post("/api/users/register", newUser);
      //then login immeditately
      const loginRes = await axios.post("/api/users/login", {
        email,
        password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      console.log();
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/todos");
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response.data.message) setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Register Below</h1>

      <form onSubmit={submit}>
        <div className="fillin-container">
          {error && (
            <ErrorNotice
              message={error}
              clearError={() => {
                setError(undefined);
              }}
            />
          )}
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Team Number"
              onChange={(e) => setTeamNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              onChange={(e) => setpasswordConfirmation(e.target.value)}
            />
          </div>

          <input
            className="btn btn-outline-success btn-lg btn-block"
            type="submit"
            value="Sign Up"
          />
        </div>
      </form>
    </div>
  );
}
