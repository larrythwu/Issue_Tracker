import React, { Component } from "react";
import axios from "axios";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: null,
    };
  }

  async componentDidMount() {
    let token = localStorage.getItem("auth-token");

    const {
      match: { params },
    } = this.props;
    console.log("here");
    const todo = (
      await axios.get(`/todo/${params.todoId}`, {
        headers: { "x-auth-token": token },
      })
    ).data;

    this.setState({
      todo,
    });
  }

  render() {
    const { todo } = this.state;
    if (todo === null) return <p />;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{todo.title}</h1>
            <hr className="my-4" />
            <p>{todo.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
