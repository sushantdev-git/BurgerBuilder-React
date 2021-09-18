import React, { Component } from 'react';
import Aux from '../Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    
    return class extends Component {

        state = {
            error:null,
        }

        componentDidMount() {
            this.resInterceptor = axios.interceptors.response.use(null, error => {
                this.setState({error:error});
            });
            //settting the error in state.

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null})
            })
            //if we are sending a new request we should clear any previous error stored in state of this componenet.
        }

        componentDidUnmount() {
            //evevery time the withErrorHandler runs it add an interceptor to axios,
            //so if withErrorHandler is called many times this will leads to memory leaks as it have so many interceptors attached to it.
            //so it is necessary that it this component is Unmounted we should also Unmount the interceptors.
            //and this can be done through eject method.
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        closeErrorHandler = () => {
            this.setState({error:null});
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} closeModal={this.closeErrorHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
        //if error is not null then we show the modal
    }
}


export default withErrorHandler;