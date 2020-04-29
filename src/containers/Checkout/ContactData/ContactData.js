import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      },
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();

    this.setState({loading: true})

    const contactForm = {};
    for (let el in this.state.orderForm) {
      contactForm[el] = this.state.orderForm[el].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      orderData: contactForm
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

  onChangeHandler = (e, id) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[id]};

    updatedFormElement.value = e.target.value;
    updatedOrderForm[id] = updatedFormElement;

    console.log(updatedFormElement.value);
    this.setState({orderForm: updatedOrderForm})
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let contactData = this.state.loading ? <Spinner /> :
      (
        <form onSubmit={this.orderHandler}>
          {formElementArray.map(i => <Input
            key={i.id}
            change={(e) => this.onChangeHandler(e, i.id)}
            label={i.config.elementConfig.placeholder}
            elementType={i.config.elementType}
            elementConfig={i.config.elementConfig}
            value={i.config.value} />)}

          <Button btnType="Success">Place order</Button>
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