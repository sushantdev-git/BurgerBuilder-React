import React from "react";

import classes from './Input.css';

const input = (props) => {

    let inputClasses = [classes.InputElement];

    if(props.shouldValidate){
        
        if(props.valid === "notChecked"){
            inputClasses.push(classes.NotChecked);
        }
        else if(!props.valid){
            inputClasses.push(classes.Invalid)
        }
        else {
            inputClasses.push(classes.ValidInput)
        }
    }

    let inputElement;
    switch(props.elementType){

        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map((option) => {
                        return (
                            <option key = {option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        )
                    })}
                </select>);
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.children}</label>
            {inputElement}
        </div>
    );
}

export default input;