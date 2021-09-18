import React, { Component} from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop'
class Modal  extends Component {
    
    shouldComponentUpdate(nextProps, nextState){
        //this modal will only render if we have show property true
        //show we will check if show property has changed, if yes then React will render this else 
        //it will not be rendered.
        return nextProps.show != this.props.show || nextProps.children != this.props.children;
    }

    componentWillUpdate(){
        console.log("Modal update")
    }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.closeModal} />
                <div className={classes.Modal} 
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0',
                }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}
export default Modal;