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
    this.deleteTodo = this.deleteTodo.bind(this);
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
          <TodoList todo={todo} delete={() => this.deleteTodo(index)} />
        );
      });

    return (
      <div className="App">
      <input placeholder="Something to do" value={this.state.todosToAdd} onChange={this.handleOnChange}/>
      <button onClick={this.handleClick}>Add</button>
      <ul style={{"listStyle": "none"}}>{listOfTodos}</ul>
      </div>
    );
  }
}

export default App;
