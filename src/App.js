import logo from './logo.svg';
import React, {useState} from 'react';
import { useReducer } from 'react';
import Calci from './Calci';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  }
  return (
    <div className="App">
      <Calci/>
    </div>
  );
}

export default App;
