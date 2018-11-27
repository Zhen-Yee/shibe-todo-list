import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';
import { Navbar } from './components/Navbar';
import jwt from 'jsonwebtoken';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shibaImg: [],
      todos: [],
      todosToAdd: "",
      noteToAdd: "",
      todosDisabled: [],
      todosDone: [],
      hours: 0,
      minutes: 0,
      username: "",
      isLoading: false
      // visible: false **used later for animation**
    };

    // Handler binders
    this.handleAdd = this.handleAdd.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleReminder = this.handleReminder.bind(this);
    // this.handleVisibility = this.handleVisibility.bind(this);
    // this.onClick = this.onClick.bind(this);
    // this.handleClik = this.handleClik.bind(this);
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
    let todosDisabled = this.state.todosDisabled.slice();
    let todosDone = this.state.todosDone.slice();
    todosDisabled[index] = true;
    todosDone.push(JSON.stringify(this.state.todos[index]));
    this.setState({isLoading: true})
    fetch('https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
      .then(res => res.json())
      .then(json => {
        this.setState({
          shibaImg: json,
          todosDisabled: todosDisabled,
          todosDone: todosDone,
          isLoading: false
        })
        localStorage.setItem("todosDone", todosDone);
      });
  }

  // calls api to start reminder countdown
  handleReminder(index) {
    fetch('/api/reminder', {
      method: 'post',
      body: JSON.stringify([this.state.username, this.state.todos[index], { hours: this.state.hours, minutes: this.state.minutes }]),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(this.setState({
      hours: 0,
      minutes: 0
    }))
  }

  // sets reminder time value to state
  handleTimeChange(e) {
    if (e.target.id === 'hours') {
      this.setState({
        hours: e.target.value
      })
    } else {
      this.setState({
        minutes: e.target.value
      })
    }
  }

  handleAdd() {
    if (this.state.todosToAdd !== '') {
      let token = localStorage.getItem('jwt');
      let user = jwt.verify(token, 'log');
      fetch('/api/addTodo', {
        method: 'post',
        body: JSON.stringify([user.username, { "title": this.state.todosToAdd, "note": this.state.noteToAdd === '' ? '-' : this.state.noteToAdd }]),
        headers: {
          'Content-Type': 'application/json',
        }
      })

      // makes copy of current list of todos and add todos to add to copy
      let todosListCopy = this.state.todos.slice();
      todosListCopy.push({
        title: this.state.todosToAdd,
        note: this.state.noteToAdd === '' ? '-' : this.state.noteToAdd
      });

      // set new todos to state
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

  // Handles event for removing a todo (removes wanted todo)
  deleteTodo(index) {
    var token = localStorage.getItem('jwt');
    var user = jwt.verify(token, 'log');

    fetch('/api/deleteTodo', {
      method: 'post',
      body: JSON.stringify([user.username, this.state.todos[index]]),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    let todosListCopy = this.state.todos.slice();
    todosListCopy.splice(index, 1);
    this.setState({
      todos: todosListCopy
    });
  }

  // handleVisibility() {
  //   this.setState({
  //     visible: !this.state.visible
  //   })
  // }

  // onClick(event) {
  //   this.handleAdd();
  // }

  // Loads user todos when page loads, if user is logged in
  componentWillMount() {
    let token = localStorage.getItem('jwt');
    let todosDone = localStorage.getItem('todosDone');
    let todosDoneArr = [];
    if (token !== null) {
      if (todosDone !== null) {
        todosDoneArr = todosDone.split('},{').join('} {').split(' ');
      }
      let user = jwt.verify(token, 'log');

      // Removes todos that are done then gets the new todos
      fetch('/api/updateTodos', {
        method: 'post',
        body: JSON.stringify([user.username, todosDoneArr]),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(this.setState({ username: user.username }),
        fetch(`/api/getTodos/${user.username}`)
          .then(res => res.json())
          .then(json => {
            let todosToAdd = this.state.todos.slice();
            json.forEach(element => {
              todosToAdd.push(JSON.parse(element.todo));
            });
            this.setState({
              todos: todosToAdd,
            });
          }))
    } else {
      console.log('Not logged in');
    }
  }

  render() {
    let todos = this.state.todos;
    const listOfTodos = todos.map((todo, index) => {
      return (
        <TodoList key={index}
          visible={this.state.visible}
          shiba={this.state.shibaImg[0]}
          note={todo.note}
          todo={todo.title}
          done={() => this.handleDone(index)}
          delete={() => this.deleteTodo(index)}
          disableCheck={this.state.todosDisabled[index]}
          time={this.handleTimeChange}
          hours={this.state.hours}
          minutes={this.state.minutes}
          handleReminder={() => this.handleReminder(index)}
          isLoading={this.state.isLoading} />
      );
    });

    return (
      <div className="App">
          <h1>Welcome to Shibe Todo List!</h1>
          <Navbar></Navbar>
          {this.state.username === '' ? <h2 style={{"color": "red"}}>Please log in to start a todo list!</h2> : <AddTodo title={this.state.todosToAdd} note={this.state.noteToAdd} keypress={this.handleOnChange} click={this.handleAdd}></AddTodo>}
          <br />
          <Card.Group>
            {listOfTodos}
          </Card.Group>
      </div>
    );
  }
}

export default App;
