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
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      mail: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Mail",
        },
        value: "",
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
      },
    },
    loading: false,
  };
  OrderHandle = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredient,
      price: this.props.total_price,
      customer: {
        name: "Parisa ",
        address: {
          street: "Street 1",
          zipCode: "15545",
          country: "Iran",
        },
        email: "mohammadiparisa",
      },
      deliveryMethod: "special",
    };
    axios
      .post("/orders", order)
      .then((response) => this.setState({ loading: false, purchasing: false }))
      .catch((error) => this.setState({ loading: false, purchasing: false }));
  };
  render() {
    const formElementArray = [];
    const orderform_keys = Object.keys(this.state.orderForm);
    orderform_keys.map((key) => {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    });

    return (
      <div className={classes.ContactData}>
        <h4> Enter your Contact Data</h4>
        <form>
          {formElementArray.map((formElement) => (
            <Input 
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            ></Input>
          ))}
          <Button btnType="Success" clicked={this.OrderHandle}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}
export default ContactData;
