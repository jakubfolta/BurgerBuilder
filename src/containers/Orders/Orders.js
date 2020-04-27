import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('orders.json')
      .then(res => {
        const fetchedOrders = []
        for (let order in res.data) {
          fetchedOrders.push({
            ...res.data[order],
            id: order
          })
        }
        this.setState({orders: fetchedOrders, loading: false})
      })
      .catch(err => {
        this.setState({loading: false})
      })

  }

  render() {
    let orders = this.state.orders.map((order) =>
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.totalPrice} />)
    orders = this.state.loading ? <Spinner/> : orders;

    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);