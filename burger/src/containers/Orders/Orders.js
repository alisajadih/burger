import React, { Component } from 'react';

import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders').then(res => {
            const fetch_Data = [];
            const fetch_Data_key = Object.keys(res.data);
            fetch_Data_key.forEach(key => {
                fetch_Data.push({
                    ...res.data[key],
                    id: key
                })
            })
            this.setState({ loading: false, orders: fetch_Data })
        }).catch(e => {
            this.setState({ loading: false })
        })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>

        )
    }
}

export default WithErrorHandler(Orders, axios);  