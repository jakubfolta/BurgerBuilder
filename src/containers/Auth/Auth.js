import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import authActions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        validity: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        validity: false,
        touched: false
      }
    }
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

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        validity: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({controls: updatedControls})
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    const form = formElementArray.map(i => (
      <Input
        key={i.id}
        change={(e) => this.inputChangedHandler(e, i.id)}
        label={i.config.elementConfig.placeholder}
        elementType={i.config.elementType}
        elementConfig={i.config.elementConfig}
        value={i.config.value}
        validity={i.config.validity}
        shouldValidate={i.config.validation}
        touched={i.config.touched} />
    ))

    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {
  onAuthHandler: () => dispatch(authActions.auth())
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);