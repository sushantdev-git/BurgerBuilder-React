import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address:{
            street:'',
            postalCode:'',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        console.log("hitting server");
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
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
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
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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