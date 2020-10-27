import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems.js";
import styles from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const SideDrawer = (props) => {
    let sideDStyle = [styles.SideDrawer, styles.Close]
    if(props.showSideDrawer) {
        sideDStyle = [styles.SideDrawer, styles.Open]
    }
  return (
    <Aux>
      <Backdrop show={props.showSideDrawer} cancel={props.cancelSideDrawer} />
      <div className={sideDStyle.join(" ")} onClick ={props.cancelSideDrawer}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems  isAuth = {props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
