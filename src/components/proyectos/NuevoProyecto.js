import React, { Fragment, useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

  // Obtener el state del formulario. usando el context
  const proyectosContext = useContext( proyectoContext );
  
  // desestructurar el useReducer, // se tiene disponible mostrarFormularioFn
  const { 
    nuevoProyectoFormulario,
    errorFormulario,

    mostrarFormularioFn,
    agregarProyectoFn,
    mostrarErrorFn 
  } = proyectosContext;

  

  // State para el proyecto
  const [proyecto, setProyecto] = useState( {
    nombre: '',

  } );

  const { nombre } = proyecto;

  // Lee los contenidos del input
  const onChangeProyecto = e => {

    setProyecto({
      ...proyecto,
      [ e.target.name ] : e.target.value
    });

  };

  // Cuando el usuario envia un proyecto
  const onSubmitProyecto = e => {
    e.preventDefault();

    // Validar el proyecto
    if ( nombre === '') {
      // Mensaje no debe ser vacio
      mostrarErrorFn( true ); 

      return;
    };
    // Agregar al state. Pasar el objeto completo del proyecto
    agregarProyectoFn( proyecto ); // se va a proyectoState
    // Reiniciar el Form
    setProyecto( {
      nombre: '',
    });

  };

  const showHideFormIzq = () => {
    mostrarFormularioFn();
  }

  return (
    // Button aparece el formulario
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={ showHideFormIzq }
      >
        Nuevo Proyecto
      </button>

      { nuevoProyectoFormulario ?
        (
          <form
          className="formulario-nuevo-proyecto"
          onSubmit= { onSubmitProyecto }
          >
            <input 
              type="text"
              className="input-text"
              placeholder="Nombre Proyecto"
              name="nombre"
              value={ nombre }
              onChange={ onChangeProyecto }
            />
    
            <input 
              type="submit"
              className="btn btn-block btn-primario"
              placeholder="Agregar Proyecto"
            />    
  
          </form>        
        )
        : null
      }

      {
        errorFormulario
        ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p>
        : null
      }
    </Fragment>
  )
}

export default NuevoProyecto
