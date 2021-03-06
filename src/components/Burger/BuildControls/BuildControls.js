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
        <p>Current Price <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map((control) => {
            return <BuildControl 
            key={control.label} label={control.label} 
            addItem = {() => {props.addItem(control.type)}} 
            removeItem = {() => {props.removeItem(control.type)}}
            disabled = {props.disabled[control.type]}
            />
        })}
        <button className={classes.OrderButton} disabled = {!props.canBuy} onClick = {() => props.orderFood(true)}>
            {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP FOR ORDER'}
        </button>
    </div>
)

export default buildControls;