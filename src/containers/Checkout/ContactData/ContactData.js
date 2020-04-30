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
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        validity: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        validity: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        validity: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        validity: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true
        },
        validity: false,
        touched: false
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

  checkValidity = (value, rules) => {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength;
    }

    if (rules.minLength && rules.maxLength) {
      isValid =  (value.trim().length >= rules.minLength) && (value.trim().length <= rules.maxLength);
    }

    return isValid;
  }

  onChangeHandler = (e, id) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[id]};

    updatedFormElement.value = e.target.value;
    if (updatedFormElement.elementType !== 'select') {
      updatedFormElement.validity = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
    }
    updatedOrderForm[id] = updatedFormElement;

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
            value={i.config.value}
            validity={i.config.validity}
            shouldValidate={i.config.validation}
            touched={i.config.touched} />)}

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