import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css";

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-size">
      <option value="small">Size 2</option>
      <option value="medium" selected>
        Size 3
      </option>
      <option value="large">Size 4</option>
    </select>
    <select className="ql-bold" />
    <select className="ql-italic" />
    <select className="ql-underline" />
    <select className="ql-align" />
    <select className="ql-color" />
    <button className="ql-clean" />
  </div>
);

const Size = Quill.import("formats/size");
Size.whitelist = ["small", "medium", "large"];
Quill.register(Size, true);

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  static modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, true] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  render() {
    return (
      <ReactQuill
        className="text-editor"
        theme="snow"
        modules={this.modules}
        formats={this.formats}
      ></ReactQuill>
    );
  }
}
export default TextEditor;
