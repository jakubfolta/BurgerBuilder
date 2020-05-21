import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as authActions from '../../store/actions/index';

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
    },
    isSignUp: true
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

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuthHandler(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      };
    })
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = this.props.loading ? <Spinner/> : formElementArray.map(i => (
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
    ));

    let error = this.props.error
      ? <p style={{color: 'hsl(7, 100%, 43%)', fontWeight: 'bold'}}>{this.props.error.message}</p>
      : null;

    let authRedirect = this.props.isAuthenticated
      ? <Redirect to="{this.props.redirectPath}"/>
      : null;

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          <h1>{this.state.isSignUp ? 'Sign up' : 'Sign in'}</h1>
          {form}
          {error}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler} >Switch to {this.state.isSignUp ? 'Sign in' : 'Sign Up'}</Button>
          {authRedirect}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    redirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthHandler: (email, password, method) => dispatch(authActions.auth(email, password, method))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);