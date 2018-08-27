import React, { Component } from 'react';

export class TodoList extends Component {
    render() {
        let todos = this.props.todos;
        const listOfTodos = todos.map((todo, index) => {
            return (
            <li key={index}>
            <input type="checkbox" />{todo}<button>X</button>
            </li>
            );
        });

        return (
            <ul style={{"listStyle": "none"}}>
                {listOfTodos}
            </ul>
        );
    }
}