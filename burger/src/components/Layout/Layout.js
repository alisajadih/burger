import React from 'react';
import Auxilary from'../../hoc/Auxilary'; 
import Toolbar from '../../components/Navigation/Toolbar/Toolbar.js'
import classes from './Layout.module.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
const layout = (props)=>(
    <Auxilary>
        <Toolbar/>
        <SideDrawer/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxilary>
)

export default layout;