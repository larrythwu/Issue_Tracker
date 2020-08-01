import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    localStorage.setItem("auth-token", "");

    setUserData({
      token: undefined,
      user: undefined,
    });
    history.push("/home");
  };
  return (
    <nav className="navbar navbar-light bg-light fixed-top">
      <Link className="navbar-brand" to="/Home">
        To-do App
      </Link>
      <div>
        {userData.user ? (
          <button class="btn btn-outline-dark" onClick={logout}>
            Log out
          </button>
        ) : (
          <>
            <button class="btn btn-outline-dark" onClick={register}>
              Register
            </button>
            <button class="btn btn-outline-dark" onClick={login}>
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
