import React from 'react';

import classes from './Buildcontrols.module.css';
import BuildControl from './Buildcontrol/Buildcontrol';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const Buildcontrols = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price={props.price.toFixed(2)}</p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            added={()=>props.ingredientadded(ctrl.type)}
            removed={()=>props.ingredientremoved(ctrl.type)} 
            disabled={props.disable[ctrl.type]}/>
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchaseable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default Buildcontrols;