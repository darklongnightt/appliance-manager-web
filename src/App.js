import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import ApplianceList from './components/appliance/ApplianceList';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={ApplianceList} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
