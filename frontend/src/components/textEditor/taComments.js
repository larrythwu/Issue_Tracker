import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill"; // ES6
import axios from "axios";
import "./textEditor.css";

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <span clasNames="ql-formats">
      <select className="ql-size" defaultValue="normal">
        <option value="normal">Normal</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>
    </span>
    <span clasNames="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <select className="ql-color" />
    </span>
    <span clasNames="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
    </span>
    <span clasNames="ql-formats">
      <button className="ql-code-block" />
      <button className="ql-image" />
    </span>
    <button className="ql-clean" />
  </div>
);

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["normal", "large", "huge"];
Quill.register(Size, true);

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

  static modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  static formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  render() {
    return (
      <div className="text-editor">
        <div className="ql-container ql-snow">
          <ReactQuill
            className="ql-editor comments"
            modules={TaComments.modules}
          />
        </div>
      </div>
    );
  }
}

export default TaComments;
