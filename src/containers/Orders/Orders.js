import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import * as fetchedOrdersActions from '../../store/actions/index';

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

const mapStateToProps = state => {
  return {
    orders: state.ord.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchedOrdersActions.fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));