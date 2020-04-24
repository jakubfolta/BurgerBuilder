import React, { Component } from 'react';

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
      <div>
        <h4>Enter your contact details.</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Mail" />
          <input type="text" name="street" placeholder="Your Street" />
          <input type="text" name="postal" placeholder="Your Postal Code" />
        </form>
      </div>
    );
  }
}

export default ContactData;