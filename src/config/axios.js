import axios from 'axios';
  // 262 Creando un Cliente Axios y variables de Entorno
  // Variable de entorno: en create_react_app indica como nombrar. 
  // oblicacion comenzar con REACT_APP
  // npm i axios
  
// una vez que llame a clienteAxios tendrá una URL como base
const clienteAxios = axios.create( {
  baseURL: process.env.REACT_APP_BACKEND_URL
});

export default clienteAxios;