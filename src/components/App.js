import React from 'react';
import '../reset.css';
import './App.css';
import Tasks from './Tasks';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
      <div className="img_background"></div>
      <Tasks/>
      </div>
    </div>
  );
}

export default App;