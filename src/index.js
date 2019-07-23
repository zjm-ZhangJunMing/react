import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import Main from './main';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";
import {combineReducers} from "redux";
import store from "./store";
import {addToCart,updateCart,deleteFromCart} from "./store/actions/cart-actions"

ReactDOM.render(<Provider store={store}><div style={{width:"100%",height:"100%"}}>
    <Main />
</div></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();