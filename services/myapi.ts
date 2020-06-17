import Axios from 'axios';

const dev = process.env.NODE_ENV !== "production";
const URL = dev ? 'http://localhost:3000/' : 'https://odonto-easy.herokuapp.com/'

const myapi = Axios.create({  
    baseURL: URL
});

export default myapi;