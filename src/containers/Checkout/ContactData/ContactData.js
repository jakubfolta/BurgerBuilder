import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false})
      });
  }

  render() {
    let contactData = this.state.loading ? <Spinner /> :
      (
        <form>
          <Input inputType="text" name="name" placeholder="Your Name" />
          <Input inputType="text" name="email" placeholder="Your Mail" />
          <Input inputType="text" name="street" placeholder="Your Street" />
          <Input inputType="text" name="postal" placeholder="Your Postal Code" />
          <Button btnType="Success" clicked={this.orderHandler}>Place order</Button>
        </form>
      )

    return (
      <div className={classes.ContactData}>
        <h3>Enter your contact details.</h3>
        {contactData}
      </div>
    );
  }
}

export default ContactData;