import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
// import {withRouter} from 'react-router-dom';

const burger = (props) => {
    let transformedIngredient;
    transformedIngredient = Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey+i} type={igKey}/>;
        })
    });

    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

//if we pass a component with a HOC withRouter, then we can receive all the props that router provides 
//because router only provider props to those component which is directly rendered with router.
//so to use router props we have to user withRouter.

// export default withRouter(burger);
export default burger;