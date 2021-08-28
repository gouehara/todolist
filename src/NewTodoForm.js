import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NewTodoForm.css";

export default class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { task: "" };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  hadleSubmit = (e) => {
    e.preventDefault();
    this.props.createTodo({ ...this.state, id: uuidv4(), completed: false });
    this.setState({ task: "" });
  };
  render() {
    return (
      <form className="NewTodoForm" onSubmit={this.hadleSubmit}>
        <label htmlFor="task">項目</label>
        <input
          id="task"
          placeholder="新規"
          type="text"
          value={this.state.task}
          name="task"
          onChange={this.handleChange}
        ></input>
        <button>追加</button>
      </form>
    );
  }
}
