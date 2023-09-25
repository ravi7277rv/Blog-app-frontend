import axios from 'axios';

// Create an Axios instance with a base URL
const Axios = axios.create({
 // baseURL: 'http://127.0.0.1:4040/api/v1', // Replace with your API base URL http://127.0.0.1:1234
 baseURL: 'https://blog-app-nhgz.onrender.com/api/v1',
});

export default Axios;