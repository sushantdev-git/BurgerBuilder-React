import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl.js';
const controls =[
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price ${props.price.toFixed(2)}</p>
        {controls.map((control) => {
            return <BuildControl 
            key={control.label} label={control.label} 
            addItem = {() => {props.addItem(control.type)}} 
            removeItem = {() => {props.removeItem(control.type)}}
            disabled = {props.disabled[control.type]}
            />
        })}
    </div>
)

export default buildControls;