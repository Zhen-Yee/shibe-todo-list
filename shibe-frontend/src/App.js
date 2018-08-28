import React, { Component } from 'react';
import { TodoList } from './components/TodoList'
import { Button, Input } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shibeImg: [],
      todos: [],
      todosToAdd: ""
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  // componentDidMount() {
  //   fetch('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true/')
  //     .then(res => res.json())
  //     .then(json => {
  //       this.setState({
  //         shibeImg: json
  //       })
  //     });
  // }

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

  handleCheck(e, data) {
    if (data.checked === true) {
        fetch('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
        .then(res => res.json())
        .then(json => this.setState({
            shibaImg: json
        })
      );
    }
  }

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
        <TodoList key={index} todo={todo} check={(e, data) => this.handleCheck(e, data)} delete={() => this.deleteTodo(index)}/>
      );
    });

    const shibe = this.state.shibaImg !== undefined ? <img src={this.state.shibaImg[0]} alt='shibe' /> : '';

    return (
      <div className="App">
        <h1>Welcome to Shibe Todo List!</h1>
        <Input placeholder="Something to do" value={this.state.todosToAdd} onChange={this.handleOnChange}/>
        <Button onClick={this.handleClick}>Add</Button>
        <ul style={{"listStyle": "none"}}>{listOfTodos}</ul>
        {shibe}
      </div>
    );
  }
}

export default App;
