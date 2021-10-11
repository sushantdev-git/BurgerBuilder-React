import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary'

import classes from './SideDrawer.css';
const sideDrawer = (props) => {

    let attechedClasses = [classes.SideDrawer, classes.Close];

    if(props.open){
        attechedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        
        <Aux>
            <Backdrop show={props.open} clicked={props.closeDrawer}/>
            <div className={attechedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuthenticated}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;