import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import { REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION } from "../../types";
import AuthContext from './authContext';
import { authReducer } from './authReducer';

const AuthState = props => {

  const initialState = {
    token: localStorage.getItem( 'token' ),
    // Si el usuario esta autenticado
    autenticado: null,
    // Info usuario
    usuario: null,
    // alertas
    mensaje: null,
    // Solucionar bugs al recargar pagina se ve otra página
    cargando: true
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Funciones


  // Registrar un usuario
  const registrarUsuario = async datos => {
    const url = '/api/usuarios'
    try {
      const respuesta = await clienteAxios.post(url, datos);

      // TypeError: Cannot read properties of undefined (reading 'token') localStorage.setItem('token', action.payload.token

      // console.log(respuesta);
      // respuesta entrega un objeto de la api, junto con los datos enviados y un token
      console.log(respuesta.data);

      dispatch( {
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      });

      // Obtener el usuario
      usuarioAutenticado();

    } catch (error) {

      // usuario ya esta registrado
      // console.log(error);
      // Error: Request failed with status code 400
      // Para obtener error detallado usar método axios
      // console.log( error.response);// de acá es posible sacar info detalle
      // console.log( error.response.data.msg);

      const alerta = {
        msg: error.response.data.msg,        
        categoria: 'alerta-error'//Clase css
      }
      // En caso de error
      dispatch( {
        type: REGISTRO_ERROR,
        payload: alerta
      });

    }
  }

  // Iniciar Sesión
  const iniciarSesion = async (datos) => {

    try {

      const respuesta = await clienteAxios.post('/api/auth', datos);
      // console.log(respuesta);

      // usuario y pass correcto. authcontroller cuando se autentica envia el token
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      });

      // Obtener el usuario
      usuarioAutenticado();
    } catch (error) {

      // console.log(error.response.data.msg);

      const alerta = {
        msg: error.response.data.msg,        
        categoria: 'alerta-error'//Clase css
      }

      // En caso de error
      dispatch( {
        type: LOGIN_ERROR,
        payload: alerta
      });
    }
  }

  // Retorna el Usuario autenticado. Sirve para cuando crea o inicia sesión
  const usuarioAutenticado = async () => {
    // Leer token de localStorage
    const token = localStorage.getItem('token');

    if ( token ) {
      // TODO: Función para enviar el token por headers 
      tokenAuth( token );
    }

    try {
      const respuesta = await clienteAxios.get('/api/auth');
      //console.log(respuesta);//Error: Request failed with status code 401, no hay token permiso no valido. esto viene del backend auth middleware
      // La respuesta es de la API respuesta.data.usuario
      dispatch( {
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario
      })
      
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR
      })
    }
  }

  // Cierra la sesión del usuario
  const cerrarSesion = () => {

    dispatch( {
      type: CERRAR_SESION
    });

  };


  return (

    <AuthContext.Provider
      value= {{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,

        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      { props.children }
    </AuthContext.Provider>
  )
}
export default AuthState;
