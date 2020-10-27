import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import styles from './Auth.module.css';
import * as authActions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../hoc/shared/chackValidity';

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
          isEmail: true,
        },
        valid: false,
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
          minLength: 6,
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true,
    formIsValid: false
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls, [controlName]: {
        ...this.state.controls[controlName], value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    let formIsValid = true;
    Object.keys(updatedControls).map(inputIdentifier => {
      return formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    })
    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup)
  }
  authMethodHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup }
    })
    this.props.onResetError()
  }

  render() {
    let formElementsArray = [];
    Object.keys(this.state.controls).map(key => {
      return formElementsArray = formElementsArray.concat({
        id: key,
        config: this.state.controls[key]
      });
    })


    let error = null;
    if (this.props.error) {
      if (this.props.error === "Network Error") error = "There was a problem with the network. please try again."
      if (this.props.error === "Request failed with status code 400" && this.state.isSignup) error = "This email already exists. Please sign in."
      if (this.props.error === "Request failed with status code 400" && !this.state.isSignup) error = "Email or password is wrong."
    }
    let form = <Spinner />

    if (!this.props.loading) form = form = formElementsArray.map(formElement => {
      return <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    })

    let authRedirect = null;
    if (this.props.isAuth) authRedirect = <Redirect to="/" />
    if (this.props.isAuth && this.props.price > 4) authRedirect = <Redirect to="/checkout" />

    return (
      <div className={styles.Auth}>
        {authRedirect}
        <div className={styles.ErrorBox}>{error}</div>
        <form
          onSubmit={this.submitHandler}
        >
          {form}
          <Button btnType="Success" disabled={!this.state.formIsValid}>{this.state.isSignup ? "SIGN UP" : "SIGN IN"}</Button>
        </form>
        <Button btnType="Danger" clicked={this.authMethodHandler}>Switch to {this.state.isSignup ? "sign in" : "sign up"}</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.tokenId !== null,
    price: state.brg.totalPrice,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(authActions.auth(email, password, isSignup)),
    onResetError: () => dispatch(authActions.resetError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);