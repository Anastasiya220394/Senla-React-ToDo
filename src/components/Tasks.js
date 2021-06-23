import React from 'react';
import { Component } from 'react';
import './Tasks.css';
import './Tabs.css';
import TodoItem from './TodoItem';
import AddTask from './AddTask';
import Header from './Header';

class Tasks extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      todoToShow: 'all',
      search: '',
    };

    this.handleDoneTask = this.handleDoneTask.bind(this);
    this.handleImportantTask = this.handleImportantTask.bind(this);
    this.searchChanged = this.searchChanged.bind(this);
  }
  componentDidMount() {
    const localRef = localStorage.getItem('todos');
    if (localRef) {
      this.setState({ todos: JSON.parse(localRef) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  addTodo = (todo) => {
    this.setState((state) => {
      let { todos } = state;
      todos.unshift({
        id: todos.length !== 0 ? todos.length : 0,
        text: todo,
        completed: false,
        important: false
      });
      return todos;
    });
  };

  handleDoneTask = (id) => {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      return {
        todos: updatedTodos,
      };
    });
  };

  handleImportantTask = (id) => {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) => {
        if (todo.id === id) {
          todo.important = !todo.important;
        }
        return todo;
      });
      return {
        todos: updatedTodos,
      };
    });
  };

  deleteTask = (id) => {
    const index = this.state.todos.map((todo) => todo.id).indexOf(id);
    this.setState((state) => {
      let { todos } = state;
      todos.splice(index, 1);
      return todos;
    });
  };

  searchItem = (search) => {
    this.setState({ search });
  };
  searchChanged(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.text.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  updateTodoToShow = (s) => {
    this.setState({
      todoToShow: s,
    });
  };

  activeCorrectFilter = (event) => {
    this.setState({
      todoToShow: event.target.id,
    });
  };

  filter(items, todoToShow) {
    if (todoToShow === 'all') {
      return items;
    } else if (todoToShow === 'active') {
      return items.filter((todo) => !todo.completed);
    } else if (todoToShow === 'done') {
      return items.filter((todo) => todo.completed);
    }
  }

  render() {
    const { todos, search, todoToShow } = this.state;
    const visibleItems = this.filter(
      this.searchChanged(todos, search),
      todoToShow
    );

    const allTasks = visibleItems.map((todo) => {
      return (
        <TodoItem
          TodoItem
          key={todo.id}
          todo={todo}
          handleDoneTask={this.handleDoneTask}
          handleImportantTask={this.handleImportantTask}
          deleteTask={this.deleteTask}
          todos={todoToShow}
        />
      );
    });

    return (
      <section className="tasks">
        <Header searchItem={this.searchItem} />
        <ul className="tabs__buttons">
          <li
            onClick={this.activeCorrectFilter}
            id="all"
            className={
              'tab' + (this.state.todoToShow === 'all' ? '-current' : '')
            }
          >
            All
          </li>
          <li
            onClick={this.activeCorrectFilter}
            id="active"
            className={
              'tab' + (this.state.todoToShow === 'active' ? '-current' : '')
            }
          >
            Active
          </li>
          <li
            onClick={this.activeCorrectFilter}
            id="done"
            className={
              'tab' + (this.state.todoToShow === 'done' ? '-current' : '')
            }
          >
            Done
          </li>
        </ul>
        <AddTask addTask={this.addTodo} />
        <div className="tasks__wrapper">
          <ul className="tasks__list">{allTasks}</ul>
        </div>
      </section>
    );
  }
}

export default Tasks;