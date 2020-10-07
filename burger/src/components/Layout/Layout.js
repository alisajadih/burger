import React from 'react';
import Auxilary from'../../hoc/Auxilary'; 
import Toolbar from '../../components/Navigation/Toolbar/Toolbar.js'
import classes from './Layout.module.css'
 
const layout = (props)=>(
    <Auxilary>
        <Toolbar/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxilary>
)

export default layout;