import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: JSON.parse(window.localStorage.getItem("todos") || "[]"),
    };
  }

  componentDidMount() {
    window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
  }

  componentDidUpdate() {
    window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
  }

  create = (newTodo) => {
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  remove = (id) => {
    this.setState({ todos: this.state.todos.filter((todo) => todo.id !== id) });
  };

  update = (id, updatedTask) => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: newTodos });
  };

  toggleCompletion = (id) => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: newTodos });
  };
  render() {
    const todos = this.state.todos.map((todo) => (
      <Todo
        key={todo.id}
        task={todo.task}
        removeTodo={this.remove}
        id={todo.id}
        updateTodo={this.update}
        completed={todo.completed}
        toggleTodo={this.toggleCompletion}
      />
    ));
    return (
      <div className="TodoList">
        <h1>Todo List</h1>
        <span>シンプルリストアプリ</span>
        <ul>{todos}</ul>
        <NewTodoForm createTodo={this.create} />
      </div>
    );
  }
}
