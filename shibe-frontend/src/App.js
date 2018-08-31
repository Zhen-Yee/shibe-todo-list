import React, { Component } from 'react';
import { TodoList } from './components/TodoList'
import { Button, Input } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shibaImg: [],
      todos: [],
      todosToAdd: "",
      todoDone: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  // Handles onClick event from the "Add" button to push the todo into the list
  handleClick() {
    if (this.state.todosToAdd !== '') {
      let todosListCopy = this.state.todos.slice();
      todosListCopy.push(this.state.todosToAdd);

      this.setState({
        todos: todosListCopy,
        todosToAdd: ""
      });
    } else {
      alert('Nothing added to todos!!!');
    }
  }
  
  // Keeps track of user input to later add to the list of todos
  handleOnChange(e) {
    this.setState({
      todosToAdd: e.target.value
    });
  }

  // Handles check event from checkbox. When checkbox is checked, it will fetch shibe img from api
  // and store it in the state.
  // Makes a copy of the todos that are done and set it's value to true (this is to prevent from user to check the checkbox multipletime)
  handleCheck(e, data, index) {
    if (data.checked === true) {
      let todosDone = this.state.todoDone.slice();
      todosDone[index] = true;
      fetch('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
      .then(res => res.json())
      .then(json => this.setState({
          shibaImg: json,
          todoDone: todosDone
        })
      );
    }
  }

  // Handles event for removing a todo (removes wanted todo)
  deleteTodo(index) {
    let todosListCopy = this.state.todos.slice();
    todosListCopy.splice(index, 1);
    this.setState({
      todos: todosListCopy
    });
  }

  render() {
    let todos = this.state.todos;
    const listOfTodos = todos.map((todo, index) => {
      return (
        <TodoList key={index} shiba={this.state.shibaImg[0]} todo={todo} check={(e, data) => this.handleCheck(e, data, index)} delete={() => this.deleteTodo(index)} disableCheck={this.state.todoDone[index]} />
      );
    });

    return (
      <div className="App">
        <h1>Welcome to Shibe Todo List!</h1>
        <Input placeholder="Something to do" value={this.state.todosToAdd} onChange={this.handleOnChange}/>
        <Button onClick={this.handleClick}>Add</Button>
        <ul style={{"listStyle": "none"}}>{listOfTodos}</ul>
      </div>
    );
  }
}

export default App;
