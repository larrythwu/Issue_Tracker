import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
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
          <Link to="/todos">
            <button
              className="btn btn-secondary btn-lg btn-block"
              type="button"
              onClick={() => {
                localStorage.setItem(
                  "auth-token",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjIwZWUwOGEzNTViN2I1NDUzMDRmMCIsImlhdCI6MTU5NjQ4OTgyN30.gxkjZieGgZ2dNzwkQHB3cvY3O6t9fl0w-2zv-AfDUVM"
                );
              }}
            >
              Guest Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
