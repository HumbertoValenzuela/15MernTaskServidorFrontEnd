// state y diferentes funciones con dispatch hacia los types
import React, { useReducer } from 'react';
// Obtener URL base
import clienteAxios from '../../config/axios';
// import { v4 as uuidv4 } from 'uuid';

import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTOS, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR  } from '../../types';
// usar el context
import proyectoContext from './proyectoContext';
// Necesario para las acciones
import { proyectoReducer } from './proyectoReducer';

// para las key npm i -D uuid


// State inicial del proyecto
const ProyectoState = props => {

  // Este proyecto se pasa al payload cuando es llamada
  // const proyectos = [
  //   { id: 1, nombre: 'Tienda Virtual'},
  //   { id: 2, nombre: 'Intranet'},
  //   { id: 3, nombre: 'Diseño Sitio Web'},
  //   { id: 4, nombre: 'Diseño Sitio SP'},
  // ];

  // Es la parte izq nuevo proyecto
  const initialState = {
    proyectos : [],
    nuevoProyectoFormulario: false,
    errorFormulario: false,
    proyecto: null,
    mensaje: null
  };

  // Dispatch para ejecutar las acciones
  // extraer del useReducer el state y el dispatch
  // Dispatch ejecutará los diferentes types. Ejecutandoles en el proyectoReducer para cambiar el state
  // const [state, dispatch ] = useReducer(reducer, initializerArg, initializer)
  const [state, dispatch ] = useReducer(proyectoReducer, initialState);

  // Serie de funciones para el CRUD
  const mostrarFormularioFn = () => {
    // usando dispatch y el type, atado con el Switch que cambiará el state
    dispatch( {
      type: FORMULARIO_PROYECTO
    })
  }

  // Al usar el dispatch es cuando se ocupa el array object de proyectos
  // obtener los proyectos
  // const obtenerProyectosFn = () => {
  //   dispatch( {
  //     type: OBTENER_PROYECTOS,
  //     // Lo que tome la funcion como parametro es lo que será el payload
  //     payload: proyectos
  //   })
  // };

  const obtenerProyectosFn =  async() => {
    try {

      // Esto ya tiene el usuario autenticado, es decir, no tener que pasar nada más
      const resultado = await clienteAxios.get('/api/proyectos');
      //axios cuando da resultado correcto, entrega un .data
      // console.log(resultado.data);

      // Uncaught TypeError: proyectos.map is not a function.
      // para Solucionar crear un log. en el reducer obtener_proyectos y ver que entrega la API. En teoría se esta enviando algo más o algo menos. Se observa en el log que se esta mandando proyectos, por lo tanto agregar .data.proyectos
      dispatch( {
        type: OBTENER_PROYECTOS,
        // Lo que tome la funcion como parametro es lo que será el payload
        payload: resultado.data.proyectos
      })
    } catch (error) {
      // console.log(error);
      // Crear mensaje alerta error
      const alerta = {
        msg: 'Hubo un error',
        // categoria agrega una clase de CSS
        categoria: 'alerta-error'
      };
      
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });

    }
  };
  // solo reactjs. agregar nuevo proyecto
  // const agregarProyectoFn = proyecto => {
  //    proyecto.id = uuidv4(); 
  //   // Insertar el proyecto en el state
  //   dispatch( {
  //     type: AGREGAR_PROYECTOS,
  //     payload: proyecto
  //   })
  // };

  // Unir Interfaz react y la api. agregar nuevo proyecto
  const agregarProyectoFn = async proyecto => {
   
    try {

      const resultado = await clienteAxios.post('/api/proyectos', proyecto)
      // console.log(resultado);
      // Insertar el proyecto en el state
      dispatch( {
        type: AGREGAR_PROYECTOS,
        payload: resultado.data
      })
      
    } catch (error) {
      // console.log(error);
      // Crear mensaje alerta error
      const alerta = {
        msg: 'Hubo un error',
        // categoria agrega una clase de CSS
        categoria: 'alerta-error'
      };
      
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });

    }
 };


  const mostrarErrorFn = () => {
    dispatch( {
      type: VALIDAR_FORMULARIO,

    })
  }

  // 207 Colocar un Proyecto en Activo
  // type proyecto_actual
  // proyectostate nueva initialstate proyecto:null (ninguno seleccionado), agregar al provider. crear funcion cuando el usuario de click en Tus Proyectos proyectoActual dispatch type payload: proyecto. agregar Fn al provider
  // reducer filter - proyecto: state.proyectos.filter
  // MostrarProyecto: usar el context, extraer proyectoActual. Crear onclick con proyectoACtual(proyecto.id)
  const proyectoActualFn = (proyectoId) => {
    // console.log(proyecto); // viene el id al seleccionar de la sección Tus Proyectos
    
    dispatch( {
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });

  };

  const eliminarProyectoFn = async (proyectoId) => {

    try {
      // No lo guarda en una constante debido a que borra registro y entrega un mensaje al cliente
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

   

      dispatch( {
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      // console.log(error);
      // Crear mensaje alerta error
      const alerta = {
        msg: 'Hubo un error',
        // categoria agrega una clase de CSS
        categoria: 'alerta-error'
      };
      
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });

    }

  }

  // Solo frontEnd
  // const eliminarProyectoFn = (proyecto) => {
  //     dispatch( {
  //       type: ELIMINAR_PROYECTO,
  //       payload: proyecto,
  //     });   
  // }
  
  return(
    // Pasar el state inicial usando el useReducer
    // Esto nos crea el context para consumir lo en el app.js
    <proyectoContext.Provider 
      value={{
        proyectos: state.proyectos,
        nuevoProyectoFormulario: state.nuevoProyectoFormulario,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,

        obtenerProyectosFn,
        mostrarFormularioFn,
        agregarProyectoFn,
        mostrarErrorFn,
        proyectoActualFn,
        eliminarProyectoFn
       }}
    >
      {
        props.children
      }
    </proyectoContext.Provider>
  )
};

export default ProyectoState
