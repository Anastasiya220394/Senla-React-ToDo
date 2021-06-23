import React from "react";
import {Component} from 'react';
import './AddTask.css';


class AddTask extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        input: ''
    }
}

  addTask = (e) => {
    e.preventDefault();
    const {input} = this.state;
    if(input) {
        this.props.addTask(input);
        this.setState({input: ''})
    }
  };

  inputOnChange = event => {
    this.setState({input: event.target.value})
  };

  render() {
    const {input} = this.state;

      return(
        <section className="area__tasks">
          <form className="add_task">
            <p className="notice">New task</p>
              <textarea className="add_task__textarea" onChange={this.inputOnChange} value={input}/>
            <div className="add_task__div">
              <button className="add_task__button" onClick={this.addTask}>ADD</button>
            </div>
          </form>
        </section>
        )
    }

}

export default AddTask;