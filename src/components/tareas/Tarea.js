import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ( { tarea } ) => { //tarea es un objeto nombre y estado

  // Solicitar datos usando useContext
  const proyectosContext = useContext( proyectoContext );
  // proyectoActualFn para obtener el id actual del proyecto. que estará activo porque está abierto un proyecto. proyecto retorna un arreglo
  const { proyecto } = proyectosContext;

  // destructuring. Mientras se utilizan es la posición 0, 1 ,2
  const [ proyectoActualFn ] = proyecto;

  const tareaContext = useContext(TareaContext);
  // obtenerTareasFn para Recargar Listado una vez eliminada una tarea
  // En tareas se encuentran los botones de completar o incompleto. cambiarEstadoTareaFn  
  const { 
    eliminarTareaFn,
    obtenerTareasFn, 
    // cambiarEstadoTareaFn, 
    actualizarTareaFn,//sirve para cambiarEstadoTarea
    guardarTareaActualFn } = tareaContext;


  // Función que se ejecuta cuando se presiona el btn eliminar tarea
  const tareaEliminar = (  id ) => {

    // Elimina una tarea
    eliminarTareaFn( id, proyectoActualFn._id );// pasar el _id hacia el backEnd
    // obtenerTareasFn( proyecto[0].id ); // otra forma de hacerlo
    // obtener tareas, de acuerdo el id actual del proyecto. Para recargar y no observar el eliminado
    obtenerTareasFn( proyectoActualFn._id );
  }

  // Funcion que modifica el estado de las tareas
  const cambiarEstado = tarea => {
    if ( tarea.estado ) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }

    // Estado actual modificado, entonces agregarlo al payload
    // cambiarEstadoTareaFn( tarea );
    actualizarTareaFn( tarea );
  }

  // Agregar una tarea actual cuando el usuario desea editarla
  const seleccionarTarea =  ( tarea ) => {

    guardarTareaActualFn( tarea );
  

  };

  return (
    <li className="tarea sombra" >
      <p> { tarea.nombre } </p>

      <div className="estado" >
        {
          // Ternario true o false
          tarea.estado
          ?
            (
              <button 
                type="button" 
                className="completo"
                onClick= { () => cambiarEstado( tarea ) }
                >
                Completo
              </button>
            )
          :
            (
              <button 
                type="button" 
                className="incompleto"
                onClick= { () => cambiarEstado( tarea ) }
              >
                Incompleto
              </button>
            )
        }
      </div>

      <div className="acciones">

        <button 
          type="button" 
          className="btn btn-primario"
          onClick= { () => seleccionarTarea( tarea ) }
        >
          Editar
        </button>

        <button 
          type="button" 
          className="btn btn-secundario"
          // Cannot update a component (`TareaState`) while rendering a. agregar un arrow Function
          onClick= { () =>  tareaEliminar( tarea._id ) }
        >
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default Tarea
