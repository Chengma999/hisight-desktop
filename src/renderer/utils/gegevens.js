// utils
import axios from 'axios';
const target = localStorage.getItem('target');

module.exports = {
  target: 'http://www.cafetariafifty-nine.nl',
  changeFormat: (p) =>
    new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(p),
  instanceLogin: axios.create({
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://www.ouheng.nl'
        : 'http://localhost:5060',
  }),
  instance: axios.create({
    baseURL:
      process.env.NODE_ENV === 'production' ? target : 'http://localhost:6050',
  }),
};
