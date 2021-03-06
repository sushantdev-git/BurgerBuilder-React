import React ,{Component} from "react";
import { connect } from "react-redux";

import axios from '../../axios-orders';
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index'
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {


    componentDidMount() {
        this.props.onFetchInit(this.props.token);
    }

    render(){
        let orders = <Spinner />

        if(!this.props.loading){
            orders = this.props.orders.map((order) => {
            
                return <Order key = {order.id} price = {order.price} ingredients = {order.ingredients}/>
            })
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchInit : (token) => dispatch(actions.fetchOrders(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));