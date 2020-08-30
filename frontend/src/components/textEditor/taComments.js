import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill"; // ES6
import axios from "axios";
import "./textEditor.css";

/*
 * Editor component with custom toolbar and content containers
 */
class TaComments extends React.Component {
  async componentDidMount() {
    let token = localStorage.getItem("auth-token");

    try {
      const contents = await axios.get("/generaltext/taComments", {
        headers: { "x-auth-token": token },
      });
      // console.log(contents);
      var editor = document.getElementsByClassName("comments");
      editor[0].innerHTML = contents.data.content;
    } catch (err) {
      console.log("empty");
      var editor = document.getElementsByClassName("comments");
      editor[0].innerHTML = "No comments yet";
      return;
    }
  }
  handleChange = (html) => {
    this.setState({ editorHtml: html });
  };

  render() {
    return (
      <div className="text-editor">
        <strong>TA Comments</strong>
        <div className="ql-container ql-snow">
          <ReactQuill className="ql-editor comments" readOnly="true" />
        </div>
      </div>
    );
  }
}

export default TaComments;
