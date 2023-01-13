import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Home.css";

// import the images 
import NodeJS from "./nodejs_logo.png"
import ReactJS from "./react_logo.png"
import MongoDB from "./mongodb_logo.png"
import JS from "./js_logo.jpg"
import Github from "./github_logo.png"
import Ticket from "./ticket_icon.png"
import Doc from "./doc_icon.png"

export default function Home() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userData.user) history.push("/todos");
  }, [userData.user]);

  return (
    <div className="home">
      {/* Intro */}
      <h2 >Introduction</h2>
      <p>This is a to-do list app built using the <strong>MERN</strong> stack: </p>
      <ul>
        <li><strong>M <img style={{"width": "9rem"}} src={MongoDB}/>:</strong> MongoDB a NoSQL database management system</li>
        <li><strong>E <img style={{"width": "2rem"}} src={JS}/>:</strong> ExpressJS a backend web application framework for NodeJS</li>
        <li><strong>R <img style={{"width": "2rem"}} src={ReactJS}/>:</strong> ReactJS a JavaScript library for developing UIs based on UI components </li>
        <li><strong>N <img style={{"width": "5rem"}} src={NodeJS}/>:</strong> NodeJS a JavaScript runtime environment</li>
      </ul>

      <p>You can use the "Guest Login" option to test out the functionality or register your account.</p>
      <p>Checkout the source code here:  <img style={{"width": "3rem"}} alt="" src={Github} />{" "}
        <a className="link" href="https://github.com/larrythwu/Issue_Tracker" target="_blank">
          Issue_Tracker
        </a>
      </p>


      <h2>Features</h2>
      <p><strong>Tickets Filing</strong> <img style={{"width": "2rem"}} src={Ticket}/></p>
      <p>You can file an issue and assign it to a person. The newly created ticket will be added to the to-do list.</p>

      <p><strong>Notepad</strong> <img style={{"width": "2rem"}}  src={Doc}/></p>
      <p>A simple text editor allows you to jot down your thoughts, don't forget to save your writings before you log out.</p>
    
      <h2>Contact</h2>
      <p>You can reach me at larrythwu@gmail.com</p>
      <p>Or checkout my other projects at <a className="link" href="https://larrythwu.com">larrythwu.com</a></p>
      </div>
  );
}
