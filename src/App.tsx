import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import CreateUser from './components/Users/CreateUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Switch>
        <ProtectedRoute exact path="/" component={ Dashboard }/> 
        <ProtectedRoute exact path="/user/create" component={ CreateUser }/> 
        <ProtectedRoute exact path='/dashboard' component={Dashboard} />
        <PublicRoute path="/login" exact component={ Login }/>
        <PublicRoute path="/register" exact component={ Register }/>
      </Switch>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
