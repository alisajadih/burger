import React, { Component } from "react";
import axios from "../../../axios-order";

import Button from "../../../components/UI/Button/Button.js";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        validation: {
          require: true,
        },
        value: "",
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        validation: {
          require: true,
        },
        value: "",
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Code",
        },
        validation: {
          require: true,
          minLength: 4,
          maxLength: 8,
        },
        value: "",
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        validation: {},
        value: "",
        valid: false,
        touched: false,
      },
      mail: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Mail",
        },
        validation: {
          require: true,
        },
        value: "",
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  inputChangeHandler = (event, InputIdentifier) => {
    const updateOrederForm = {
      ...this.state.orderForm,
    };
    updateOrederForm[InputIdentifier].value = event.target.value;
    updateOrederForm[InputIdentifier].touched = true;
    updateOrederForm[InputIdentifier].valid = this.checkValidity(
      updateOrederForm[InputIdentifier].value,
      updateOrederForm[InputIdentifier].validation
    );

    let formIsValid = true;
    const updateOrederForm_keys = Object.keys(updateOrederForm);
    updateOrederForm_keys.map((input) => {
      formIsValid = updateOrederForm[input].valid && formIsValid;
    });

    this.setState({ orderForm: updateOrederForm, formIsValid: formIsValid });
  };

  OrderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    const formData_keys = Object.keys(this.state.orderForm);
    formData_keys.map((formElementIdentifer) => {
      formData[formElementIdentifer] = this.state.orderForm[
        formElementIdentifer
      ].value;
    });
    const order = {
      ingredients: this.props.ingredient,
      price: this.props.total_price,
      orderData: formData,
    };
    axios
      .post("/orders", order)
      .then((response) => this.setState({ loading: false, purchasing: false }))
      .catch((error) => this.setState({ loading: false, purchasing: false }));
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.require) {
      isValid = value.trim() !== "";
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  render() {
    const orderform_keys = Object.keys(this.state.orderForm);
    return (
      <div className={classes.ContactData}>
        <h4> Enter your Contact Data</h4>
        <form onSubmit={this.OrderHandler}>
          {orderform_keys.map((formElement) => (
            <Input
              elementType={this.state.orderForm[formElement].elementType}
              elementConfig={this.state.orderForm[formElement].elementConfig}
              value={this.state.orderForm[formElement].value}
              isValid={this.state.orderForm[formElement].valid}
              shouldValidate={this.state.orderForm[formElement].validation}
              touched={this.state.orderForm[formElement].touched}
              changed={(event) => this.inputChangeHandler(event, formElement)}
            ></Input>
          ))}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}
export default ContactData;
