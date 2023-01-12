import React, { Component, useEffect, useContext } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

import "./todos.css";

class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: null,
    };
  }

  async componentDidMount() {
    console.log(this.props.teamNumber);
    let token = localStorage.getItem("auth-token");
    console.log(token);
    const td = await axios.get("/api/todo/all", {
      headers: { "x-auth-token": token, teamNumber: this.props.teamNumber },
    });

    this.setState({
      todos: td.data,
    });
  }

  render() {
    return (
      <div className="todos-container">
        <div className="overflow-auto">
          <div className="todos">
            <strong className="title">To dos</strong>

            {this.state.todos === null && <p>Loading</p>}
            {this.state.todos != null &&
              this.state.todos.map((todo) => (
                <div className="card border-secondary mb-3" key="${todo._id}">
                  <Link to={`/todos/${todo._id}`}>
                    <div className="card-header">{todo.assignment}</div>
                    <div className="card-body">
                      <p className="card-text">{todo.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <Link to="/newTodo">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Add</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(Todos);
