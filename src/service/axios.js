import axios from "axios";

const accessToken1 = (localStorage.getItem('token') !== null) ? localStorage.getItem('token') : localStorage.getItem('vendor')

const apiURL = "http://demo.cleversoindia.com/serviceApi";

const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    Authentication: accessToken1,
  },
})

export default authAxios;

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     config.headers['Authentication'] = localStorage.getItem('token');
//     return config;
//   }, function (error) {
//     return Promise.reject(error);
//   });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     return response;
//   }, function (error) {
//     return Promise.reject(error); 
//   });

//   export default axios;