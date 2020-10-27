import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

  const ingredients = Object.keys(props.ingredients);

  let OrderList = ingredients.map((ing) => {
    return (
      <li key={ing}>
        <span style={{ textTransform: "capitalize" }}>{ing}</span>:{" "}
        {props.ingredients[ing]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order </h3>
      <p>A delecious burger with the following ingredients:</p>
      <ul>{OrderList}</ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType={"Danger"} clicked={props.cancel}>CANCEL</Button>
      <Button btnType={"Success"} clicked={props.continue}>CONTINUE</Button>
    </Aux>
  );
};

export default OrderSummary;
