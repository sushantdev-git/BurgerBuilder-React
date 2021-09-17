import React from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientList = Object.keys(props.ingredients).map(igkey => {
        return (
            <li key={igkey}>
                <span>{igkey}</span>:{props.ingredients[igkey]}
            </li>
        );
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientList}
            </ul>
            <p>Procced to Checkout?</p>
            <Button click={() => {props.cancelOrder(false)}} btnType = "Danger">Cancel</Button>
            <Button btnType = "Success">Continue</Button>
        </Aux>
    );
    
}

export default orderSummary;