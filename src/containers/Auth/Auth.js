import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

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
        change={(e) => this.onChangeHandler(e, i.id)}
        label={i.config.elementConfig.placeholder}
        elementType={i.config.elementType}
        elementConfig={i.config.elementConfig}
        value={i.config.value}
        validity={i.config.validity}
        shouldValidate={i.config.validation}
        touched={i.config.touched} />
    )
    )

    return (
      <div>
        <form>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;