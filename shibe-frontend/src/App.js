import React, { Component } from 'react';
import { TodoList } from './components/TodoList'

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
      let todosCopy = this.state.todos.slice();
      todosCopy.push(this.state.todosToAdd);
      this.setState({
        todos: todosCopy,
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

  render() {
    return (
      <div className="App">
      <input placeholder="Something to do" value={this.state.todosToAdd} onChange={this.handleOnChange}/>
      <button onClick={this.handleClick}>Add</button>
      <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
