import React from 'react';
import styles from './Order.module.css';

const Order = (props) => {
    return (
        <div className = {styles.Order} >
            <p>Ingredients: 
                <span className = {styles.Ing}>Salad: {props.ingredients.salad}</span>
                <span className = {styles.Ing}>Bacon: {props.ingredients.bacon}</span>
                <span className = {styles.Ing}>Cheese: {props.ingredients.cheese}</span>
                <span className = {styles.Ing}>Meat: {props.ingredients.meat}</span>
            </p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;