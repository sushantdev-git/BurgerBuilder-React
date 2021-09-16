import React, { Component } from 'react';

import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const Ingredient_Price = {
    salad: 0.5,
    bacon: 0.9,
    cheese: 0.6,
    meat: 1.2,
}
class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice :4,
    }

    addItemHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients,
        }

        updatedIngredients[type]+=1;
        const updatedPrice = this.state.totalPrice + Ingredient_Price[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        })
    }

    removeItemHandler = (type) => {
        
        const updatedIngredients = {
            ...this.state.ingredients,
        }
        if(updatedIngredients[type] <= 0){
            return;
        }
        updatedIngredients[type]-=1;
        const updatedPrice = this.state.totalPrice - Ingredient_Price[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        })
    }

    render () {
        const disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls  
                addItem = {this.addItemHandler} 
                removeItem = {this.removeItemHandler} 
                disabled={disableInfo}
                price = {this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;