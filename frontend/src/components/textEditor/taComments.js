import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill"; // ES6
import axios from "axios";
import "./textEditor.css";

/*
 * Editor component with custom toolbar and content containers
 */
class TaComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const contents = await axios.get("/generaltext/taComments", {
      headers: { "x-auth-token": token },
    });

    console.log(contents);
    let texts = contents.data.content;
    this.setState({ texts });
    var editor = document.getElementsByClassName("comments");
    editor[0].innerHTML = texts;
  }
  handleChange = (html) => {
    this.setState({ editorHtml: html });
  };

  render() {
    return (
      <div className="text-editor">
        <div className="ql-container ql-snow">
          <ReactQuill className="ql-editor comments" readOnly="true" />
        </div>
      </div>
    );
  }
}

export default TaComments;
