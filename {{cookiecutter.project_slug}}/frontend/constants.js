import axios from "axios";


const HOST = "{{cookiecutter.frontend_host}}";

var PREFIX = 'http://'
var WS_PREFIX = `ws://`;

export const URL = `${PREFIX}${HOST}/api/v1`
// This creates an instance of Axios we can use throughout the entire app
let my_app = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json"},
});

export const setClientToken = (token) => {
  my_app.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default my_app;