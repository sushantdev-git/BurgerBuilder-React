import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        //this is the state of our burger builder
        ingredients: null,
        purchasable : false,
        purchasing : false,
        totalPrice :4,
        loading: false,
    }

    componentDidMount = () => {
        axios.get('ingredients.json')
            .then(response => {
                this.setState({
                    ingredients : response.data,
                })
            })
            .catch(error => console.log(error));
    }
    updatePurchasable = (ingredients) => {
        //this method will be called to update purchasable variable 
        //purchasable is used to disable/enable order Now button according to item count;
        let itemCount = Object.keys(ingredients).map(key => {
            return ingredients[key];
        })
        .reduce((sum, ele) => {
            return sum+ele;
        }, 0)

        this.setState({purchasable: itemCount > 0});

    }

    purchasingHaldler = (val) => {
        //this method will set the purchasing variable in state to true/false
        //if true then we will show the order summary, (this can be set true while clicking in ORDER NOW button)
        //we can set the purchasing to false by clicking the cancel button in order summary or clicking backdrop in modal
        console.log(val);
        this.setState({
            purchasing : val,
        })
    }

    continuePurchasing = () => {

        //this method will be called when user clicked "continue" in order summary, then we send out data to firebase.
        // this.setState({
        //     loading:true,
        // })
        // const order = {
        //     user : {
        //         name : 'Sushant',
        //         email: 'test@test.com',
        //         adddress : {
        //             street : 'random',
        //             zipCode: 3943982,
        //             country: 'India',
        //         }
        //     },
        //     delhiveryMethod: 'fastest',
        //     ingredients : this.state.ingredients,
        //     price : this.state.totalPrice,
        // }

        // //here sending the post request to the firebase,
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false})
        //     })
        //     .catch(error => this.setState({loading: false, purchasing: false}));

        this.props.history.push('/checkout')
    }

    addItemHandler = (type) => {
        //this method will be used to add item to the burger 
        //it will be called from build controls.
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
        //this method will be used to remove item from burger
        //this will be called from build controls
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

        let orderSummary = null;

        let burger = <Spinner />;
        if(this.state.ingredients){
            //we are fetching ingredient from server so if we ingredient only we show Burger and BuildControls
            burger = (
                <Aux>
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
            
            //and also same for order summary, which is dependent on ingredients.
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            price = {this.state.totalPrice} 
            cancelOrder={this.purchasingHaldler} 
            continue={this.continuePurchasing}/>
        }

        if(this.state.loading){
            //if we send data to firebase then we should set a spinner is orderSummary
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show = {this.state.purchasing} closeModal = {this.purchasingHaldler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);