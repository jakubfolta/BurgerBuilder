import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-8a5e2.firebaseio.com/',
})

export default instance;