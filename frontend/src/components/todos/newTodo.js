import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

class NewTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: "",
      description: "",
    };
  }

  updateDescription(value) {
    this.setState({
      description: value,
    });
  }

  updateTitle(value) {
    this.setState({
      title: value,
    });
  }

  async submit() {
    this.setState({
      disabled: true,
    });

    let token = localStorage.getItem("auth-token");

    await axios.post(
      "/todo",
      {
        title: this.state.title,
        description: this.state.description,
      },
      {
        headers: { "x-auth-token": token },
      }
    );

    this.props.history.push("/todos");
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-secondary">
              <div className="card-header">New To-do</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {
                      this.updateTitle(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give your post a title."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {
                      this.updateDescription(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give more context to your post."
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-success btn-lg btn-block"
                  onClick={() => {
                    this.submit();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
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
    );
  }
}

export default withRouter(NewTodo);
