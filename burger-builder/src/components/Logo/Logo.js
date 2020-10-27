import React from "react";
import styles from "./Logo.module.css";
import burgerLogo from "../../assets/images/28.1 burger-logo.png";

const Logo = () => {
  return (
    <div className={styles.Logo}>
      <img src={burgerLogo} alt="MyBurger" />
    </div>
  );
};

export default Logo;