import React from "react";

import classes from './Order.css';
const Order =  (props) => {

    return (
        <div className={classes.Order}>
            <h3>Ingredients</h3>
            {Object.keys(props.ingredients).map((ingredient, inx) => {
                return (<p key={inx}
                style={{
                    "display":"inline-block",
                    "border":"1px solid #eee",
                    "boxShadow":"0 2px 3px #ccc",
                    "padding":"10px",
                    "margin": "5px"
                }}>{ingredient}: {props.ingredients[ingredient]} </p>);
            })}
            <p><span style={{
                "fontWeight":"900"
            }}>Price</span>: <strong>{props.price}</strong></p>
        </div>
    )
}

export default Order;