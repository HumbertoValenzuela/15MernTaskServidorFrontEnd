import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const MostrarProyecto = ( { proyecto } ) => {//Pasar props proyecto

  // Obtener el state de proyectos
  const mostrarProyectoContext = useContext( proyectoContext );
  // Obtener la función del context de tarea
  const tareaContext = useContext( TareaContext );

  // desestructurar
  const { proyectoActualFn } = mostrarProyectoContext;
  const { obtenerTareasFn } = tareaContext;

  // Función para agregar el proyecto actual
  const seleccionarProyecto = id => {
    proyectoActualFn( id ); //Fijar un proyecto actual
    obtenerTareasFn( id );//Filtrar las tareas cuando se de clic
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        // en mongodb _id
        onClick= { () => seleccionarProyecto( proyecto._id ) }
      >
        { proyecto.nombre }
      </button>
    </li>
  )
}

export default MostrarProyecto
