import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import * as fetchedOrdersActions from '../../store/actions/index';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = this.props.orders.map((order) =>
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.totalPrice} />)
    orders = this.props.loading ? <Spinner/> : orders;

    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.ord.orders,
    loading: state.ord.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(fetchedOrdersActions.fetchOrders(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));