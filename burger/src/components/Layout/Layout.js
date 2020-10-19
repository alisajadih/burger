import React, { Component } from 'react';
import Auxilary from '../../hoc/Auxilary';
import Toolbar from '../Navigation/Toolbar/Toolbar.js'
import classes from './Layout.module.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state={
        showSideDrawer: false
    }

    SideDrawerCloseHandler=()=>{
        this.setState({showSideDrawer:false})
    }

    SideDrawerToggleeHandler=()=>{
        this.setState((prevState)=>{
        return {showSideDrawer:!prevState.showSideDrawer}
        })
    }
    render() {
        return (
            <Auxilary>
                <Toolbar SideDrawerToggleClicked={this.SideDrawerToggleeHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.SideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>
        )
    }

}

export default Layout;