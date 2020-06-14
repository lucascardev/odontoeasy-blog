import Axios from 'axios';

const myapi = Axios.create({  
    baseURL: 'https://odonto-easy.herokuapp.com/' 
});

export default myapi;