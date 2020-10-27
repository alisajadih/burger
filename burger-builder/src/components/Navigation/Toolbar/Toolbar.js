import React from "react";
import Logo from "../../Logo/Logo";
import styles from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={props.sideDrawerToggle}/>
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems isAuth = {props.isAuth}/>
      </nav>
    </header>
  );
};

export default Toolbar;
