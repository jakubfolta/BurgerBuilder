import React, { Component } from 'react';

import classes from './ContactData.css';
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
        <h4>Enter your contact details.</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Mail" />
          <input type="text" name="street" placeholder="Your Street" />
          <input type="text" name="postal" placeholder="Your Postal Code" />
          <Button btnType="Success" clicked>Place order</Button>>
        </form>
      </div>
    );
  }
}

export default ContactData;