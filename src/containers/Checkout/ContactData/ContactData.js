import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {

    state = {
        orderForm : {
            name: this.getInputObject("input", "text", "", "Enter your name"),
            email: this.getInputObject("input", "email", "", "Enter your email"),
            street: this.getInputObject("input", "text", "", "Enter your street"),
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Enter zip code",
                },
                value: "",
                validity: {
                    required:true,
                    minLength : 5,
                    maxLength: 5,
                },
                isValid: "notChecked",
            },
            country: this.getInputObject("input", "text", "", "Enter your country"),
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
        loading: false,
    }


    getInputObject(elementType, type, value, placeholder){
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder,
            },
            value: value,
            validity: {
                required:true,
            },
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

    checkValidity(rules, value){

        let isValid = true;
        if(rules == undefined){
            return isValid;
        }
        if(rules.required){
            isValid = value.trim().length > 0 && isValid;
        }

        if(rules.minLength){
            isValid = rules.minLength <= value.length && isValid;
        }

        if(rules.maxLength){
            isValid = rules.maxLength >= value.length && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading:true,
        })

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
            ingredients : this.props.ingredients,
            price : this.props.price,
        }

        //here sending the post request to the firebase,
        axios.post('/orders.json', order)
            .then(response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            })
            .catch(error => this.setState({loading: false}));
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
        if ( this.state.loading ) {
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

export default ContactData;