import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css';
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from '../../store/actions/index';


class Auth extends Component {

    state = {
        form : {
            email : this.getInputObject("input", "email", "", "Enter your email",{required: true, isEmail:true}),
            password : this.getInputObject("input", "password", "", "Enter your password",{required: true, minLength: 5}),
        },
        formIsValid: false,
        isSignUp : true,
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
            ...this.state.form,
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
            form: formData,
            formIsValid: formIsValid,
        })
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(this.state.form.email.value,this.state.form.password.value, this.state.isSignUp)
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return {
                isSignUp : !prevState.isSignUp
            }
        });
    }

    componentDidMount(){
        //if user is not building burger, but path is redirected to order we will set path to home
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }
    render() {
        let formElementsArray = []
        for(let key in this.state.form){
            formElementsArray.push({
                id: key,
                config: this.state.form[key],
            })
        }

        let form = (
            <form onSubmit={this.submitHandler}>
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
                <Button btnType="Success" disabled={false}>SUBMIT</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage  = (<p>{this.props.error.message}</p>);
        }

        let redirect = null;
        if(this.props.isAuthenticated){
            redirect = <Redirect to={this.props.authRedirectPath} />;
        }


        return (
                <div className={classes.Auth}>
                    {redirect}
                    {errorMessage}
                    {form}
                    <Button btnType="Danger" disabled={false}
                    clicked= {this.switchAuthMode}
                    >Switch to {this.state.isSignUp ? "SignIn" : "SignUp"}</Button>
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger : state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const matchDispatchProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.sethAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, matchDispatchProps)(Auth);