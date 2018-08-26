import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shibeImg: [],
      imgLoaded: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    fetch('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          shibeImg: json,
          imgLoaded: true
        })
      });
  }

  handleClick() {
    fetch('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          shibeImg: json,
          imgLoaded: true
        })
      });
  }

  render() {
    return (
      <div className="App">
      <img src={this.state.shibeImg[0]} alt='Shibe Derp' />
      <br></br>
      <button onClick={this.handleClick}>Click me!</button>
      </div>
    );
  }
}

export default App;
