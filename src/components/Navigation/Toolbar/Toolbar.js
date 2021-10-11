import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerButton from './HamburgerButton/HamburgerButton';
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <HamburgerButton clicked = {props.toggleDrawer}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated = {props.isAuthenticated}/>
        </nav>
    </header>
)

export default toolbar;