import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../errors/ErrorNotice";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setpasswordConfirmation] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { userData, setUserData } = useContext(UserContext);
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
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
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

          <input
            className="btn btn-outline-success btn-lg btn-block"
            type="submit"
            value="Login"
          />

          <button
            className="btn btn-secondary btn-lg btn-block"
            type="button"
            onClick={async () => {
              const loginUser = {
                email: "larrythwu@gmail.com",
                password: "wth001104",
              };
              console.log(loginUser);
              //Login
              const loginRes = await axios.post("users/login", loginUser);
              localStorage.setItem("auth-token", loginRes.data.token);

              setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
              });

              history.push("/todos");
            }}
          >
            Guest Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Login);
