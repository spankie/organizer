import React from 'react';
import logo from '../src/assets/images/logo.svg';
import './App.css';
import {Link} from "react-router-dom";
import { Button, Icon} from "antd";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <Icon type="home" style={{fontSize: "8rem"}} />
        <p>
          <code>Manage your organizations</code> 
        </p>
        <Button type="primary"><Link to="/register">Get Started</Link></Button>
      </header>
    </div>
  );
}

export default App;
