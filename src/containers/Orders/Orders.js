import React ,{Component} from "react";
import axios from '../../axios-orders';
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {

    state = {
        orders : []
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then((res) => {
                let orders = []
                
                for(let key in res.data){
                    console.log(res[key]);
                    orders.push({
                        id: key,
                        ...res.data[key],
                    })
                }
                console.log(orders);
                this.setState({orders: orders});
            })
            .catch((err) => console.log(err));
    }
    render(){
        let orders = this.state.orders.map((order) => {
            
            return <Order key = {order.id} price = {order.price} ingredients = {order.ingredients}/>
        })
        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);