import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Home() {
  const history = useHistory();

  history.push("/login");
  return <h1>Page Not Found</h1>;
}
