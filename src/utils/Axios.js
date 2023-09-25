import axios from 'axios';

// Create an Axios instance with a base URL
const Axios = axios.create({
  baseURL: 'http://127.0.0.1:4040/api/v1', // Replace with your API base URL
  // timeout: 10000, // Optional: Set a timeout for requests (in milliseconds)
  // headers: {
  //   'Content-Type': 'application/json',
    
  // },
});

export default Axios;