//index will be hub of all action creators and we can just point to one file to get a specific action creator.

export {
    addIngredient,
    removeIngredient,
    initIngredients
} from './burgerBuilder';

export {
    burgerPurchase,
    purchaseInit,
    fetchOrders,
} from './order';


export {
    auth,
} from './auth';  