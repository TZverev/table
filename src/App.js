import React from 'react';
import Header from './header';
import Table from './table';
import './styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <Router>
      <Header />
      <Table />
    </Router>
  );
}

export default App;
