import React, { Component } from "react";
import {connect } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../store/actions/index';


class ContactData extends Component {

    state = {
        orderForm : {
            name: this.getInputObject("input", "text", "", "Enter your name", {required: true}),
            email: this.getInputObject("input", "email", "", "Enter your email",{required: true, isEmail:true}),
            street: this.getInputObject("input", "text", "", "Enter your street",{required: true}),
            zipCode: this.getInputObject("input", "text", "", "Enter Zip Code", {required:true, minLength : 5, maxLength: 5,}),
            country: this.getInputObject("input", "text", "", "Enter your country",{required: true}),
            delhiveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value:"fastest", displayValue:"Fastest"},
                        { value:"cheapest", displayValue:"Cheapest"},
                    ]
                },
                value: "fastest",
                isValid:true,
            }
        },
        formIsValid: false,

    }


    getInputObject(elementType, type, value, placeholder, validity){
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder,
            },
            value: value,
            validity: validity,
            isValid: "notChecked",
        }
    }

    inputChangeHandler = (event, inputIdentifier) => {
        let formData = {
            ...this.state.orderForm,
        }

        let updatedElement = {
            ...formData[inputIdentifier],
        }

        updatedElement.value = event.target.value;
        updatedElement.isValid = this.checkValidity(updatedElement.validity, updatedElement.value);
        formData[inputIdentifier] = updatedElement;

        let formIsValid = true;
        for(let key in formData){
            formIsValid = (formData[key].isValid && formData[key].isValid !== "notChecked") && formIsValid;
        }

        console.log(formIsValid);
        this.setState({
            orderForm: formData,
            formIsValid: formIsValid,
        })
    }

    checkValidity(rules, value) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        let formData = {
            ...this.state.orderForm
        };

        const order = {
            user : {
                name : formData.name.value,
                email: formData.email.value,
                adddress : {
                    street : formData.street.value,
                    zipCode: formData.zipCode.value,
                    country: formData.country.value,
                }
            },
            delhiveryMethod: formData.delhiveryMethod.value,
            ingredients : this.props.ings,
            price : this.props.price,
        }

        this.props.onBurgerOrder(order);
    }

    render(){

        let formElementsArray = []
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }
        let form = (
            <form>
                {formElementsArray.map((form) => {
                    return <Input 
                    key = {form.id}
                    elementType={form.config.elementType} 
                    elementConfig={form.config.elementConfig} 
                    value={form.config.value}
                    changed={(event) => this.inputChangeHandler(event,form.id)}
                    valid = {form.config.isValid}
                    shouldValidate = {form.config.validity}
                    >
                    </Input>
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
    }
}

const matchDispatchToProps = dispatch => {
    return {
        onBurgerOrder : (orderData) => dispatch(actions.burgerPurchase(orderData)),
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(withErrorHandler(ContactData,axios));