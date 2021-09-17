import React , { Component }from 'react';
import Aux from '../../hoc/Auxillary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state ={
        showSideDrawer: false,
    }

    closeSideDrawer = () => {
        this.setState({showSideDrawer: false});
    }

    openSideDrawer = () => {
        this.setState({showSideDrawer: true});
    }

    sideDrawerToggler = () => {
        this.setState((prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer}
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar toggleDrawer={this.sideDrawerToggler}/>
                <SideDrawer open={this.state.showSideDrawer} closeDrawer = {this.closeSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;