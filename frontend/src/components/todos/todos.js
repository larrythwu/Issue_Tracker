import React, { Component, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
      <div className="container">
        <div className="row">
          <Link to="/newTodo">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-body">
                <h4 className="card-title">+ New Todo</h4>
              </div>
            </div>
          </Link>
          {this.state.todos === null && <p>Loading</p>}
          {this.state.todos != null &&
            this.state.todos.map((todo) => (
              <div key={todo._id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/todos/${todo._id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">{todo.title}</div>
                    <div className="card-body">
                      <p className="card-text">{todo.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Todos;
