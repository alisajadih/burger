import React from "react";
import styles from "./BuildControl.module.css";

const BuildControl = (props) => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.label}>{props.label}</div>
      <button className={styles.More} onClick={props.addIngredient}
      >
        More
      </button>
      <button className={styles.Less} onClick={props.removeIngredient}
      disabled={props.disableInfo}>
        Less
      </button>
    </div>
  );
};

export default BuildControl;
