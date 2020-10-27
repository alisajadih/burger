import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import styles from "./Burger.module.css";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ing) => {
      return [...Array(props.ingredients[ing])].map((_, index) => {
        return <BurgerIngredient key={ing + index} type={ing} />;
      });
    })
    .flat();
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={styles.BurgerParent}>
      <div className={styles.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
    </div>
  );
};

export default Burger;
