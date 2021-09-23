import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        //this is the state of our burger builder
        purchasing : false,
        loading: false,
    }

    componentDidMount = () => {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients : response.data,
        //         })
        //     })
        //     .catch(error => console.log(error));
    }


    purchasingHaldler = (val) => {
        //this method will set the purchasing variable in state to true/false
        //if true then we will show the order summary, (this can be set true while clicking in ORDER NOW button)
        //we can set the purchasing to false by clicking the cancel button in order summary or clicking backdrop in modal
        this.setState({
            purchasing : val,
        })
    }

    continuePurchasing = () => {

        //this method will be called when user clicked "continue" in order summary, then we send out data to firebase.
 
        this.props.history.push('/checkout');
    }


    render () {
        const disableInfo = {
            ...this.props.ings
        }

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = <Spinner />;
        if(this.props.ings){
            //we are fetching ingredient from server so if we ingredient only we show Burger and BuildControls
            burger = (
                <Aux>
                    <div style={{
                        "display":"flex",
                        "flexDirection":"column",
                        "justifyContent":"space-between",
                        "height":"100%",
                    }}>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls  
                        addItem = {this.props.onIngredientAdded} 
                        removeItem = {this.props.onIngredientRemoved} 
                        disabled={disableInfo}
                        price = {this.props.price}
                        canBuy = {this.props.purchasable}
                        orderFood = {this.purchasingHaldler}
                        />
                    </div>
                </Aux>
            );
            
            //and also same for order summary, which is dependent on ingredients.
            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            price = {this.props.price} 
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

//in mapStateToProp function we are getting state and slicing those attributes from state that we want in our component.
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        purchasable: state.ingredientCount > 0,
    }
}

//in matchDispatchProsp we create our functions that we want in our component and that will finally manipulate the state of redux store.
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGRDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDEINT, ingredientName: ingName}),
    }
}

//here connect take the function mapStateToProp, which return a function and in that function we pass our component.
//by doing this the state that we have sliced in mapStateToProp, we will be able to get that sliced state in form of props in our 
//component.
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));