import React, { Component } from 'react';

export class TodoList extends Component {
    render() {
        return (
          <li>
          <input type="checkbox" />{this.props.todo}<button onClick={this.props.delete}>X</button>
          </li>
        );
    }
}