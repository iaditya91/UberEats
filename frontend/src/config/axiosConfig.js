import axios from 'axios';

export default axios.create({
  baseURL: 'http://3.15.5.174:4000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});
