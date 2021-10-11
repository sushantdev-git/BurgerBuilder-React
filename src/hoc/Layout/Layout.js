import React , { Component }from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxillary/Auxillary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state ={
        showSideDrawer: false,
    }

    closeSideDrawer = () => {
        this.setState({showSideDrawer: false});
    }


    sideDrawerToggler = () => {
        this.setState((prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer}
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar toggleDrawer={this.sideDrawerToggler} isAuthenticated = {this.props.isAuthenticated}/>
                <SideDrawer open={this.state.showSideDrawer} closeDrawer = {this.closeSideDrawer} isAuthenticated = {this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null,
    }
}

export default connect(mapStateToProps)(Layout);