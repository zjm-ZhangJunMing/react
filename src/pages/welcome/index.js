import React,{Component} from "react";
import {createStore} from "redux";
import {combineReducers} from "redux";
import "./index.css"
import {addToCart, deleteFromCart, updateCart} from "../../store/actions/cart-actions";
import store from "../../store";

// let unsubscribe = store.subscribe(() =>
//     console.log(store.getState())
// );
store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));

// store.dispatch(updateCart('Flour 1kg', 5, 110));
// store.dispatch(deleteFromCart('Coffee 500gm'));
// unsubscribe();
class Welcome extends React.Component{
    constructor(props){
        super(props)
        const shujus=JSON.stringify(store.getState())
        this.state={
            shuju:"store中数据："+shujus
        }
    }
    render(){
        return(
            <div className="welcome">
                <h1>{this.state.shuju}</h1>
            </div>
        )
    }
}
export  default  Welcome;