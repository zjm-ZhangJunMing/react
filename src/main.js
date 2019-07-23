import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import App from './App';
import Login from "./pages/login/login"

export default ()=>{
    return(
        <div style={{width:"100%",height:"100%"}}>
            <Router>
                <Route exact path="/" component={Login}></Route>
                <Route path="/app" component={App}></Route>
            </Router>
        </div>

    )
}