import React from "react";


import classes from './Button.css';


const button = (props) =>{


    let buttonClasses= [classes.Button, classes[props.btnType]];
    if(props.disabled){
        buttonClasses.push(classes.Disabled);
    }
    return (
            <button
                className={buttonClasses.join(' ')}
                onClick={props.clicked}
                disabled = {props.disabled}
            >{props.children}</button>
    );
}

export default button;