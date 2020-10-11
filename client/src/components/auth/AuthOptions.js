import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

function AuthOptions() {
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
    history.push("/");
  };
  return (
    <nav className="navbar navbar-light bg-light fixed-top">
      <Link className="navbar-brand" to="/Home">
        Issue Tracker
        <img
          className="logo"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAADt7e309PRMTEx5eXlISEj8/Px3d3fl5eXx8fHp6emKioqpqam2trZiYmJWVlZQUFAjIyO/v786OjrGxsbU1NTOzs5nZ2eBgYGVlZWcnJxsbGwxMTEWFhbe3t4zMzOmpqYoKCgQEBCGhoYdHR0/Pz+YmJi4c/o6AAAD30lEQVR4nO3d6VbiQBAF4BQqKKIs7gJuqPP+bzgwOBAg6e4bOlZXn/v995y6RjCpqoaiICIiIiIiIiIiIiIiIiIiIiIiIiIiIiKCjM+0K2jZo8hAu4ZWzWQp56t4JpJ3xCf5ca5dSUsGspHnVXwWyTviVHbk94f6LpJ3xKv9gCIz7Zqiuj4MmFfEyoAij9p1RXNXHVBkqF1ZJLUBRUbatUVxXx9Q5FS7ugicAUW62vUd7dUdUOStp13icS58AUXmpiMGBBT5OtEus7lOSECRl452oU0FBlx61S61mZOX4ITyoF1sEyeT8IAif7TLxfU+kIAy1q4X1nuDAhq8fbvNPeA3FNDen2hxmnvAERTwW7tc3BAKaPDpYgYFvNUuF3eOBbT3ZPHkT1XywYDJGfhTlUzsPRk++1OVGHz0nfpT2Q5YMZxw6WvXC6vp3ddY5B7Q4BW8wQLaaz45hhNVLrXrhT1gAS+064VlH9Azfdlnrzvqnb6kEvCz4c8FDSe27qMWjeg27JdcWgm4ah41mciGDyfUr+AK/sTdxwLqzSf+t//ewPt9ZPqiGrC7qQF7pMGmL3LXVv1e5QbuArhjBKcvaQQU5J4RG07ctBjB7aAFH/ovGRtOJBQwNCI2nLhuOQZYZ8h7numAIW8K2HAiuYD+Vw0W8OpXwlQZN/2tY9MXvYDOl5KrLGz6Mv21QPscV9BdGDac0AvofTOsO4OFDSeefzVUmecKrlQ/E2PDiaQDVh9twYYTemfxggJWnRjILODhOj02fWna+jlecMD9dSUs4JNSPCjg7jYINn1RC9jr+osr2zZvsOmL4tktbGVJZP7T2cCmL6qH0x7BiOuNAmw4oXxuC7txXu+aY8MJ9YNp2K3zUgcbTiRwZgu7txRZWAuI3l1iEln5xW6/EMlsxL63FDChE3fghk+gpDZiwRUYewHhJZgAyS1tg2swXgnuNIN7Ih5JHggFN0WcEj0OCu6KOCS70wxui9SapBowVsSkl7bBjZFKLykHLIr+19EBU9+IBZcqDqW/EdubZx4QPta6y8jKL7ZaYTAgunuwZWjlF22kmguI7h+sGdtpRhup5gJuPp4y34DoFoLeyu8RkF6xyYBIr9jkZ66shPaKzQYM7RXrrfxGENIrNh0wpFest/Ibia9XrLcwGo27V5xBQHevOIuArl5xJgHre8V6K7/RVTdSMwpYfbbwXbuouDoHOxh6O80t6e8dvzP46X8+u71ivZ3mFpV7xZl+v0jvO/OAxaaRqrfT3L5/S8U5fifF1jD3gEUxUl8YJSIiIiIiIiIiIiIiIiIiIiIiIiIiIqIE/QU8Ci1wMOd1PAAAAABJRU5ErkJggg=="
        />
      </Link>
      <div>
        {localStorage.getItem("auth-token") ? (
          <button className="btn btn-outline-dark" onClick={logout}>
            Log out
          </button>
        ) : (
          <>
            <button className="btn btn-outline-dark" onClick={register}>
              Register
            </button>
            <button className="btn btn-outline-dark" onClick={login}>
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default withRouter(AuthOptions);
