import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import styles from "./Layout.module.css";
import {connect} from'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerToggle = () => {
    this.setState((pervState) => {
      return { showSideDrawer: !pervState.showSideDrawer };
    });
  };

  cancelSideDrawer = () => {
    this.setState({
      showSideDrawer: false,
    });
  };
  render() {
    return (
      <Aux>
        <SideDrawer
          showSideDrawer={this.state.showSideDrawer}
          cancelSideDrawer={this.cancelSideDrawer}
          isAuth = {this.props.isAuth}
        />
        <Toolbar sideDrawerToggle={this.sideDrawerToggle} isAuth = {this.props.isAuth} />
        <main className={styles.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.tokenId !== null
  }
}

export default connect(mapStateToProps)(Layout);
