import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import styles from "./BuildControls.module.css";

const BuildControls = (props) => {
  let controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
  ];


  return (
    <div className={styles.BuildControls}>
      <p>
        Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            key={control.label}
            type={control.type}
            label={control.label}
            addIngredient={() => props.addIngredient(control.type)}
            removeIngredient={() => props.removeIngredient(control.type)}
            disableInfo={props.disableInfo[control.type]}
          />
        );
      })}
      {props.isAuth ? <button
        className={styles.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.goingToOrder}
      >
        ORDER NOW
      </button> :
        <button
          className={styles.OrderButton}
          onClick={props.goingToOrder} >
          SIGN UP TO ORDER
      </button>
      }

    </div>
  );
};

export default BuildControls;
