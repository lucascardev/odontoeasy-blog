import Axios from 'axios';
const myapi = Axios.create({  
    baseURL: process.env.REACT_APP_API_URL
});

export default myapi;