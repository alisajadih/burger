import React, { Component } from 'react';
import axios from '../../../axios-order'

import Button from '../../../components/UI/Button/Button.js'
import classes from './ContactData.module.css'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        name: ' ',
        email: ' ',
        address: {
            street: ' ',
            postalCode: ' '
        },
        loading: false
    }
    OrderHandle = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredient,
            price: this.props.total_price,
            customer: {
                name: 'Parisa ',
                address: {
                    street: 'Street 1',
                    zipCode: '15545',
                    country: 'Iran'
                },
                email: 'mohammadiparisa'
            },
            deliveryMethod: 'special'
        }
        axios.post("/orders", order)
            .then(response => this.setState({ loading: false, purchasing: false }))
            .catch(error => this.setState({ loading: false, purchasing: false }))

    }
    render() {
        return (
            <div className={classes.ContactData}>
                <h4> Enter your Contact Data</h4>
                <form>
                    <Input inputtype='input' type="text" name="email" placeholder="Your Mail"></Input>
                    <Input inputtype='input' type="text" name="street" placeholder="Street"></Input>
                    <Input inputtype='input' type="text" name="postal" placeholder="Postal Code"></Input>
                    <Input inputtype='input' type="text" name="name" placeholder="Your Name"></Input>
                    <Button btnType="Success" clicked={this.OrderHandle}>ORDER</Button>
                </form>
            </div>
        )
    }
}
export default ContactData;