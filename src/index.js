import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import burgerBuilderReducer from './store/reducres/bugerBuilder';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk))); //aplying middleware.

const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();


//createStore help us to create store where our app state is stored.

//applyMiddleware help us to apply some middleware or do some action in between some action(some function to change state) and reducer.
//like creating http request as we know that reducer is a asynchronous in nature so it will not wait for some http request to complete.
//that's why we need middleware to do some task in between.

//thunk help us to do some synchronous task.
