import React from 'react';
import NavigationItem from './NavigationItem.js/NavigationItem';

import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link = '/' active = {false}> Burger Builder </NavigationItem>
        <NavigationItem link = '/' active = {false}> Checkout</NavigationItem>
    </ul>
)

export default navigationItems;