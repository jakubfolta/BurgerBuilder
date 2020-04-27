import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
  },
  loading: false
}

  orderHandler = (e) => {
    e.preventDefault();

    this.setState({loading: true})

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      customer: {
        name: 'Jake F',
        address: {
          street: 'Teststreet 1',
          zipCode: '43245',
          country: 'UK'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false})
      })
      .catch(error => {
        this.setState({loading: false})
      })
  }

  render() {
    let contactData = 
    return (
      <div className={classes.ContactData}>
        <h3>Enter your contact details.</h3>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
          <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
          <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
          <Button btnType="Success" clicked={this.orderHandler}>Place order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;