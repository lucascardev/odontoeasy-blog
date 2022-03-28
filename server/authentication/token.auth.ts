import JWT, {Algorithm} from 'jsonwebtoken'
require('dotenv').config()

const { ERR_INVALID_TOKEN } = require('../errors/Errortypes')
const ALGORITHM:Algorithm = 'HS256'

const autenticatelogin = data => (
    new Promise((resolve) => {
      JWT.sign(data, process.env.JWT_KEY, { algorithm: ALGORITHM,  expiresIn: 3600 }, (err, token) => {
        if (err) {
          let err = ERR_INVALID_TOKEN;
          resolve({err});
        }
        resolve({token});
      });
    })
  );

  const verifytoken = token => (
    new Promise((resolve) => {
      // console.log(token);
      JWT.verify(token, process.env.JWT_KEY, { algorithms: [ALGORITHM] }, (err, token) => {
        if (err) {
          let err = ERR_INVALID_TOKEN;
          resolve({err});
        }
        const unhashedtokendata = {token};
        resolve(unhashedtokendata);
      });
    })
  );


export default {
    autenticatelogin,
    verifytoken
};