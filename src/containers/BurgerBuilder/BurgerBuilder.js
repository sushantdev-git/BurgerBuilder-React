import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        purchasable : false,
        purchasing : false,
        totalPrice :4,
        loading: false,
    }

    updatePurchasable = (ingredients) => {

        let itemCount = Object.keys(ingredients).map(key => {
            return ingredients[key];
        })
        .reduce((sum, ele) => {
            return sum+ele;
        }, 0)

        this.setState({purchasable: itemCount > 0});

    }

    purchasingHaldler = (val) => {
        console.log(val);
        this.setState({
            purchasing : val,
        })
    }

    continuePurchasing = () => {
        this.setState({
            loading:true,
        })
        const order = {
            user : {
                name : 'Sushant',
                email: 'test@test.com',
                adddress : {
                    street : 'random',
                    zipCode: 3943982,
                    country: 'India',
                }
            },
            delhiveryMethod: 'fastest',
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
        }

        //here sending the post request to the firebase,
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => this.setState({loading: false, purchasing: false}));
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
        this.updatePurchasable(updatedIngredients);
        
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
        this.updatePurchasable(updatedIngredients);
    }

    render () {
        const disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary  = <Spinner />;

        if(!this.state.loading){
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            price = {this.state.totalPrice} 
            cancelOrder={this.purchasingHaldler} 
            continue={this.continuePurchasing}/>
        }

        return (
            <Aux>
                <Modal show = {this.state.purchasing} cancelOrder = {this.purchasingHaldler} >
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} haveIngredients = {this.state.purchasable}/>
                <BuildControls  
                addItem = {this.addItemHandler} 
                removeItem = {this.removeItemHandler} 
                disabled={disableInfo}
                price = {this.state.totalPrice}
                canBuy = {this.state.purchasable}
                orderFood = {this.purchasingHaldler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;