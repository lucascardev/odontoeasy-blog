const dotenv = require('dotenv') 
dotenv.config()

module.exports = {
  env: {
    ALGORITHM_CRYPT: process.env.ALGORITHM_CRYPT,
    SECRET_KEY: process.env.ECRET_KEY,
    SECRET_IV: process.env.SECRET_IV,
    JWT_KEY: process.env.JWT_KEY,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL
  },
}