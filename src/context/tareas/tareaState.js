import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';

// import { v4 as uuidv4 } from 'uuid';
import { 
  TAREAS_PROYECTO, 
  AGREGAR_TAREA, 
  VALIDAR_TAREA, 
  ELIMINAR_TAREA, 
  // ESTADO_TAREA, 
  TAREA_ACTUAL, 
  ACTUALIZAR_TAREA, 
  LIMPIAR_TAREA } from '../../types';
import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';


const TareaState = (props) => {

  const initialState = {
    // tareas: [
    //   { id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
    //   { id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2 },
    //   { id: 3, nombre: 'Elegir Plataforma de Pago', estado:true, proyectoId: 3 },
    //   { id: 4, nombre: 'Elegir Hosting', estado: false, proyectoId: 4 },
    //   { id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
    //   { id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 2 },
    //   { id: 7, nombre: 'Elegir Plataforma de Pago', estado:true, proyectoId: 3 },
    //   { id: 8, nombre: 'Elegir Hosting', estado: false, proyectoId: 4 },
    //   { id: 9, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
    //   { id: 10, nombre: 'Elegir Colores', estado: false, proyectoId: 2 },
    //   { id: 11, nombre: 'Elegir Plataforma de Pago', estado:true, proyectoId: 3 },
    //   { id: 12, nombre: 'Elegir Hosting', estado: false, proyectoId: 4 },
    // ],
    // tareasproyecto: null,
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  // Obtener las tareas de un proyecto
  const obtenerTareasFn = async proyecto => {

    // console.log(proyecto);// una seleccionado el proyecto es que se ejecuta la función
    try {
      
      const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
      console.log(resultado);
      dispatch({
          type: TAREAS_PROYECTO,
          payload: resultado.data.tareas
      });
    } catch (error) {
      console.log(error);
    }
    
    // console.log(proyecto);
  };

  // const agregarTareaFn = tarea => {

  //   // Para agregar un id nuevo
  //   // tarea.id = uuidv4();
  //       dispatch( {
  //     type: AGREGAR_TAREA,
  //     payload: tarea
  //   })
  // }

  const agregarTareaFn = async tarea => {

    // POST http://localhost:4000/api/tareas 400 (Bad Request)
    // console.log(tarea);//proyectoId: undefined
    try {
      
      const resultado = await clienteAxios.post('/api/tareas', tarea);
      // console.log(resultado);
      // TypeError: Cannot read properties of undefined (reading 'filter') esto pasa por el tareaReducer
      dispatch( {
        type: AGREGAR_TAREA,
        // payload: resultado.data.tarea
        payload: resultado.data.tarea
    });
    } catch (error) {
      console.log(error);
    }
  }

  const validarTareaFn = () => {
    dispatch( {
      type: VALIDAR_TAREA,
    });

  };

  // Eliminar tarea por id
  const eliminarTareaFn = async (id, proyecto) => {

    try {
      
      await clienteAxios.delete(`/api/tareas/${id}`, { params: {proyecto }})

      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      });
    } catch (error) {
      console.log(error);
    }

  };

  // Cambia el estado de cada tarea
  // const cambiarEstadoTareaFn = (tarea) => {

  //   // Pasar el objeto completo tarea. 
  //   dispatch( {
  //     type: ESTADO_TAREA,
  //     payload: tarea
  //   });

  // };

  // Extrae una tarea para edición(tarea actual)
  const guardarTareaActualFn = tarea => {

    dispatch( {
      type: TAREA_ACTUAL,
      payload: tarea
    });

  };

  // Edita o actualizar una tarea
  const actualizarTareaFn = async (tarea) => {

    // console.log(tarea );//Al presionar completo incompleto se obtiene la tarea

    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

      // console.log(resultado);//resultado.data.tarea
      dispatch( {
        type: ACTUALIZAR_TAREA,
        // payload: tarea
        payload: resultado.data.tarea
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Limpiar tareaseleccionada
  const limpiarTareaFn = () => {

    dispatch( {
      type: LIMPIAR_TAREA 
    });

  };

  return (
    <TareaContext.Provider
      value={{ 
        // tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,

        obtenerTareasFn,
        agregarTareaFn,
        validarTareaFn,
        eliminarTareaFn,
        // cambiarEstadoTareaFn,
        guardarTareaActualFn,
        actualizarTareaFn,
        limpiarTareaFn
       }}
    >
      { props.children }
    </TareaContext.Provider>
  ) 
}

export default TareaState;
