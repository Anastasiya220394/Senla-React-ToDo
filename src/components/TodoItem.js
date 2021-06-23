import React from "react";
import './TodoItem.css';
import Delete from '../images/Delete.svg';
import Star from '../images/star_border.svg';

function TodoItem(props) {
    const completedStyle = {
        textDecoration: "line-through"
    }
    const Actionbtn = () => <div onClick={() => props.handleImportantTask(props.todo.id)}>
        {!props.todo.important ? <button className="btnImportant">MARK IMPORTANT</button> : 
        <p><img className = 'star' src={Star} alt='star'/>
        <button className="notImportant">NOT IMPORTANT</button></p>}
        </div>;
    const className = 'text-task' + (props.todo.important ? '-bold' : '');
    return (
        <li>
        <Actionbtn/>
        <img className="delete_btn" src={Delete} alt = 'del' onClick={() => props.deleteTask(props.todo.id)}/>
        <span className={className} onClick={() => props.handleDoneTask(props.todo.id)} 
        style={props.todo.completed ? completedStyle: null}>{props.todo.text}
        </span>
    </li>
    )
}

export default TodoItem