import React, { Component } from 'react';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      trails: []
    };
  }

  componentDidMount() {
    fetch("https://www.hikingproject.com/data/get-trails?lat=45.5122&lon=-122.6587&maxDistance=100&maxResults=200&key=200389223-3bf695b3b65fa6a3b5068d682e7850c9")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            trails: result.trails
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {


    const { error, isLoaded, trails } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {trails.map(trail => (
            <li key={trail.name}>
              {trail.name}
              <br/>
              {trail.type}
              <br/>
              {trail.difficulty}
              <br/>
              {trail.url}
              <br/>
              {trail.imgSmallMed}
              <hr/>
            </li>

          ))}
        </ul>
      );
    }
  }
}
