import React, { Component, useEffect, useContext } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: null,
    };
  }

  async componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const td = await axios.get("/todo/all", {
      headers: { "x-auth-token": token },
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
            {this.state.todos === null && <p>Loading</p>}
            {this.state.todos != null &&
              this.state.todos.map((todo) => (
                <div className="card border-secondary mb-3" key="${todo._id}">
                  <Link to={`/todos/${todo._id}`}>
                    <div className="card-header">{todo.title}</div>
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
            <div className="card-header">Add+</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(Todos);
