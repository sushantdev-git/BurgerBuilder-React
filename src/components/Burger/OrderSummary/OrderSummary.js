import React from 'react';
import Aux from '../../../hoc/Auxillary/Auxillary';
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
            <p><strong>Total Price : ${props.price.toFixed(2)}</strong></p>
            <p>Procced to Checkout?</p>
            <Button clicked={() => {props.cancelOrder(false)}} btnType = "Danger">Cancel</Button>
            <Button btnType = "Success" clicked= {
                () => {
                    props.continue();
                    props.cancelOrder(false);
                }
            }>Continue</Button>
        </Aux>
    );
    
}

export default orderSummary;