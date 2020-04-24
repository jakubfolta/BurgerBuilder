import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
  }
}

  render() {
    return (
      <div className={classes.ContactData}>
        <h3>Enter your contact details.</h3>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
          <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
          <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
        </form>
        <Button btnType="Success">Place order</Button>
      </div>
    );
  }
}

export default ContactData;