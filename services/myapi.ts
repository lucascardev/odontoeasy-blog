import Axios from 'axios';

const myapi = Axios.create({  
    baseURL: 'http://localhost:3000' 
});

export default myapi;