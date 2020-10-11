import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

import "./Home.css";
import ECE297Login from "./ECE297Login.png";
import ECE297TextEditor from "./ECE297TextEditor.png";
import ECE297Text from "./ECE297Text.png";

export default function Home() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userData.user) history.push("/todos");
  }, [userData.user]);

  return (
    <div>
      <div className="photos">
        <img src={ECE297Login} />
        <img src={ECE297TextEditor} />
        <img src={ECE297Text} />
      </div>
      <h3> Motivation of this project </h3>
      <h4>
        These are screenshots of the issue tracker we used in ECE297, a software
        development course I took last year. As you can tell, it is not much of
        an issue tracker, rather than a simple latex editor. Everything from the
        weekly to-do list and milestone planning to TA's comments is condensed
        into a single text page. The lack of essential features makes it
        obsolete, and the single-page text format makes it tedious to navigate.
        Therefore, I was inspired to make the lives of future students a little
        bit easier. With additional features and a modern UI, this project aims
        to replace the old issue tracker used in ECE297, hopefully as soon as
        the 2020 winter term.
      </h4>

      <h3> Recent Messages </h3>
      <h4>
        Still in progress... Stay tuned for more features. Register for an
        account or use the "Guest Login" to try out the beta version.
      </h4>

      <h4>
        <strong>Lastest update:</strong> Oct. 1st 2020 Minor UI changes
      </h4>
    </div>
  );
}
