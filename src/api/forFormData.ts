import axios from "axios";


const axiosInstanseFormData = axios.create({
  // baseURL: "https://localhost:5050/api/",
  baseURL: "http://" + process.env.VUE_APP_BASE_URL + "/api/",
  headers: {
    "Access-Control-Allow-Origin":'*',
    'Accept': 'multipart/form-data',
    'Authorization': window.localStorage.getItem('token'),
    'Content-Type': 'multipart/form-data',
  }
});

// axiosInstanse.interceptors.request.use(config => {
//   if (config.headers) { config.headers.Authorization = window.localStorage.getItem('token') }
// return config
// })

export default axiosInstanseFormData;
