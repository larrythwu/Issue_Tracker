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
      await axios.get(`/api/todo/${params.todoId}`, {
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
    await axios.delete(`/api/todo/${id}`, {
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
          <div className="card border-secondary" key="${todo._id}">
            <div className="card-header">
              <strong>{todo.assignment}</strong>
            </div>
            <div className="card-body">
              <p>{todo.description}</p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-success btn-lg btn-block"
            onClick={async () => {
              this.deletePost();
            }}
          >
            Resolved
          </button>

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
