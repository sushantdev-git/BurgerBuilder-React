import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = (props) => {
    let transformedIngredient;
    transformedIngredient = Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey+i} type={igKey}/>;
        })
    });

    if(!props.haveIngredients){
        transformedIngredient = (<p>Add Ingredients.</p>);
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;