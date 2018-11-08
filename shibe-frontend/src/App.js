import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';
//import { Navbar } from './components/Navbar';
import jwt from 'jsonwebtoken';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shibaImg: [],
      todos: [],
      todosToAdd: "",
      noteToAdd: "",
      todoDone: [],
      user: "",
      username: ""
    };

    // Handler binders
    this.handleAdd = this.handleAdd.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleDone = this.handleDone.bind(this);
    // this.handleClik = this.handleClik.bind(this);
  }

  // Handles onClick event from the "Add" button to push the todo into the list
  handleAdd() {
    if (this.state.todosToAdd !== '') {
      var token = localStorage.getItem('jwt');
      var user = jwt.verify(token, 'log');

      fetch('/api/addTodo', {
        method: 'post',
        body: JSON.stringify([user.username, { "title": this.state.todosToAdd, "note": this.state.noteToAdd }]),
        headers: {
            'Content-Type': 'application/json',
        }
      })

      let todosListCopy = this.state.todos.slice();
      todosListCopy.push({
        title: this.state.todosToAdd,
        note: this.state.noteToAdd
      });
      
      this.setState({
        todos: todosListCopy,
        todosToAdd: "",
        noteToAdd: ""
      });
      console.log(this.state.todos);
    } else {
      alert('Nothing added to todos!!!');
    }
  }
  
  // Keeps track of user input to later add to the list of todos
  handleOnChange(e) {
    if (e.target.id === 'title') {
      this.setState({
        todosToAdd: e.target.value
      });
    } else {
      this.setState({
        noteToAdd: e.target.value
      });
    }
  }

  // Handles check event from checkbox. When checkbox is checked, it will fetch shibe img from api
  // and store it in the state.
  // Makes a copy of the todos that are done and set it's value to true (this is to prevent from user to check the checkbox multipletime)
  handleDone(index) {
    let todosDone = this.state.todoDone.slice();
    todosDone[index] = true;
    fetch('https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
    .then(res => res.json())
    .then(json => this.setState({
        shibaImg: json,
        todoDone: todosDone
      })
    );
  }

  // // Handler for test route
  // handleClik(index) {
  //   let todosDone = this.state.todoDone.slice();
  //   todosDone[index] = true;
  //   fetch('/api/test')
  //   .then(res => res.json())
  //   .then(bruh => this.setState({ users: bruh }));
  //   console.log(this.state.users);
  // }
  
  // Handles event for removing a todo (removes wanted todo)
  deleteTodo(index) {
    let todosListCopy = this.state.todos.slice();
    todosListCopy.splice(index, 1);
    this.setState({
      todos: todosListCopy
    });
  }

  // Loads user todos when page loads, if user is logged in
  componentWillMount() {
    let token = localStorage.getItem('jwt');
    if (token !== null) {
      let user = jwt.verify(token, 'log');
      fetch(`/api/getTodos/${user.username}`)
        .then(res => res.json())
        .then(json => {
          let todosToAdd = this.state.todos.slice();
          json.forEach(element => {
            todosToAdd.push(JSON.parse(element.todo));
          });
          this.setState({
            todos: todosToAdd
          });
        })
    } else { 
      console.log('Not logged in');
    }
  }

  render() {
    let todos = this.state.todos;
    const listOfTodos = todos.map((todo, index) => {
      return (
        <TodoList key={index} shiba={this.state.shibaImg[0]} note={todo.note} todo={todo.title} done={() => this.handleDone(index)} delete={() => this.deleteTodo(index)} disableCheck={this.state.todoDone[index]} />
      );
    });

    return (
      <div className="App">
        <AddTodo title={this.state.todosToAdd} note={this.state.noteToAdd} keypress={this.handleOnChange} click={this.handleAdd}></AddTodo>
        <br />
        {/* TEST button to call test route */}
        {/* <Button onClick={this.handleClik}>sad</Button> */}
        <Card.Group>{listOfTodos}</Card.Group>
      </div>
    );
  }
}

export default App;
