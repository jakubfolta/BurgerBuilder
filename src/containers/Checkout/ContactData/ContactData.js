import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import * as orderActions from '../../../store/actions/index';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';

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
        value: 'fastest',
        validation: {},
        validity: true
      },
    },
    formIsValid: false
  }

  orderHandler = (e) => {
    e.preventDefault();

    const contactForm = {};
    for (let el in this.state.orderForm) {
      contactForm[el] = this.state.orderForm[el].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: contactForm,
      userId: this.props.userId
    };
    this.props.onOrderHandler(this.props.token, order, this.props.userId);
  }

  checkValidity = (value, rules) => {
    let isValid = false;

    if (!rules) {
      return true // for "deliveryMethod" state object
    }

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength;
    }

    if (rules.minLength && rules.maxLength) {
      isValid =  (value.trim().length >= rules.minLength) && (value.trim().length <= rules.maxLength);
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
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

    let validForm = true;
    for (let id in updatedOrderForm) {
        validForm = updatedOrderForm[id].validity && validForm;
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: validForm})
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let contactData = this.props.loading ? <Spinner /> :
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

          <Button btnType="Success" disabled={!this.state.formIsValid}>Place order</Button>
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

const mapStateToProps = state => {
  return {
    ingredients: state.bur.ingredients,
    totalPrice: state.bur.totalPrice,
    loading: state.ord.loading,
    token: state.auth.token,
    userId: state.auth.userId

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderHandler: (token, order, userId) => dispatch(orderActions.sendOrder(token, order, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));