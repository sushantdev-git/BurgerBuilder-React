import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burgerbuilder-68afc-default-rtdb.firebaseio.com/',
})

export default instance;