import React, { Fragment, useContext } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';


// ListadoTareas se debe mostrar en proyectos
const ListadoTareas = () => {  

  // Solicitar datos usando useContext
  const proyectosContext = useContext( proyectoContext );
  // Desestructuracion
  const { proyecto, eliminarProyectoFn } = proyectosContext;

  const tareaContext = useContext(TareaContext);
  const { tareasproyecto } = tareaContext;


  // Recargar listado una vez eliminado una tarea

  // console.log(tareasproyecto);
  // debugger;
  // TypeError: proyecto is not iterable
  // Debido a que la primera vez que carga, no se tiene ningún proyecto

  // Si no hay proyecto seleccionado
  if ( !proyecto ) return <h2>Selecciona un proyecto</h2>;
  
  // Array Destructuring para extraer el proyecto actual. El primer campo es la posicion 0
  const [ proyectoActualFn ] = proyecto;

  // estado: esta completa o no
  // const tareasProyecto = [
  //   // { nombre: 'Elegir Plataforma', estado: true },
  //   // { nombre: 'Elegir Colores', estado: false },
  //   // { nombre: 'Elegir Plataforma de Pago', estado:true },
  //   // { nombre: 'Elegir Hosting', estado: false },
  // ];

  const onClickEliminar = () => {

    eliminarProyectoFn( proyectoActualFn._id );

  };

  return (
    <Fragment>
      <h2>Proyecto: { proyectoActualFn.nombre }</h2>
      <ul className="listado-tareas">
        {
          // Revisar si esta vacio
          tareasproyecto.length === 0
            ? ( <li className="tarea"> <p>No hay tareas</p> </li> )
            :  
            <TransitionGroup>
              {
                tareasproyecto.map( tarea => (
                  <CSSTransition
                    // Key se mueve acá porque este es el primer hijo de esta hiteración
                    key= {tarea._id}
                    // Propiedad de CSSTransition timeout
                    timeout={ 200 }
                    classNames="tarea"
                  >
                    <Tarea 
                    // prop hacia el componente
                      tarea={ tarea }
                    />
                  </CSSTransition>
                ))           
              }
            </TransitionGroup>   
        }
      </ul>

      <button type="button" className="btn btn-eliminar" onClick= { onClickEliminar } >
        Eliminar Proyecto &times;
      </button>

    </Fragment>
  )
}
export default ListadoTareas;
