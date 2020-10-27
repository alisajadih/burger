import React, { Component } from "react";
import styles from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary.js";
import Backdrop from "../../UI/Backdrop/Backdrop";

class Modal extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return (
  //     nextProps.show !== this.props.show ||
  //     nextProps.children !== this.props.children
  //   );
  // }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} cancel={this.props.cancel} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
