import React from 'react';
import Aux from '../../../hoc/Auxillary';


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
            
            <button>Proceed to checkout</button>
            <button onClick={() => {props.cancelOrder(false)}}>Cancel</button>
        </Aux>
    );
    
}

export default orderSummary;