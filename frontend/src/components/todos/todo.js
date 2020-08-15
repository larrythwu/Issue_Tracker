import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import "./todos.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: null,
      id: undefined,
    };
  }

  async componentDidMount() {
    let token = localStorage.getItem("auth-token");

    const {
      match: { params },
    } = this.props;

    const td = (
      await axios.get(`/todo/${params.todoId}`, {
        headers: { "x-auth-token": token },
      })
    ).data;

    this.setState({
      todo: td,
      id: params.todoId,
    });
  }

  async deletePost() {
    let token = localStorage.getItem("auth-token");
    let id = this.state.id;
    await axios.delete(`/todo/${id}`, {
      headers: { "x-auth-token": token },
    });
    this.props.history.push("/todos");
  }

  render() {
    const { todo } = this.state;
    if (todo === null) return <p />;
    return (
      <>
        <div className="container">
          <div className="jumbotron col-12">
            <h1 className="display-3">{todo.title}</h1>
            <hr className="my-4" />
            <p>{todo.description}</p>

            <button
              type="button"
              className="btn btn-success btn-lg btn-block"
              onClick={async () => {
                this.deletePost();
              }}
            >
              Resolved
            </button>
          </div>

          <Link to="/todos">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg btn-block"
            >
              Back
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default withRouter(Todo);
