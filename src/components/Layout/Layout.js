import React from 'react';
import Aux from '../../hoc/Auxillary';

const layout = (props) => (
    <Aux>
        <p>Toolbar, Backdrop , navigation</p>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;