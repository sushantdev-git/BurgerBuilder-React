import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'
const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope you enjoy this Burger!!</h1>
            <div >
                <div style={{width: '100%', margin:"auto"}}>
                    <Burger ingredients={props.ingredients} haveIngredients={true}/>  
                </div>
                <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked ={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;