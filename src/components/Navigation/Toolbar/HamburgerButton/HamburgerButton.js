import React from 'react';

import classes from './HamburgerButton.css';

const hamBurgerButton = (props) => {

    return (
        <div onClick={props.clicked} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default hamBurgerButton;