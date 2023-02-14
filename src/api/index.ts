import axios from "axios";

const axiosInstanse = axios.create({
  // baseURL: "https://localhost:5050/api/",
  baseURL: "http://" + process.env.VUE_APP_BASE_URL + "/api/",
  headers: {
    "Access-Control-Allow-Origin":'*',
    'Content-type': 'application/json;charset=UTF-8',
    'Authorization': window.localStorage.getItem('token')
  }
});
const axiosInstanseFormData = axios.create({
  // baseURL: "https://localhost:5050/api/",
  baseURL: "http://" + process.env.VUE_APP_BASE_URL + "/api/",
  headers: {
    "Access-Control-Allow-Origin":'*',
    'Content-Type': 'multipart/form-data',
    'Authorization': window.localStorage.getItem('token')
  }
});

// axiosInstanse.interceptors.request.use(config => {
//   if (config.headers) { config.headers.Authorization = window.localStorage.getItem('token') }
// return config
// })

export default axiosInstanse;
