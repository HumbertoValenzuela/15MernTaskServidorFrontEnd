import React, { useContext, useEffect, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

  // Solicitar datos usando useContext
  const proyectosContext = useContext( proyectoContext );
  // Desestructuracion
  const { proyecto } = proyectosContext;

  
  const tareaContext = useContext(TareaContext);
  const { errortarea, tareaseleccionada, agregarTareaFn, validarTareaFn, obtenerTareasFn, actualizarTareaFn, limpiarTareaFn } = tareaContext;  

  
  // Effect que detecta si hay una tarea seleccionada
  useEffect( () => {
    
    if ( tareaseleccionada !== null) {
      guardarTarea( tareaseleccionada );    
      
    } else {
      guardarTarea( { nombre: '' } );
    }
    // Dependencia a escuchar tareaseleccionada
  }, [tareaseleccionada]);
  
  // State del Formulario
  const [tarea, guardarTarea] = useState( {
    nombre: '',
  });

  const { nombre } = tarea; 

  // TypeError: proyecto is not iterable
  // Debido a que la primera vez que carga, no se tiene ningún proyecto

  // Si no hay proyecto seleccionado
  if ( !proyecto ) return null;
  
  // Array Destructuring para extraer el proyecto actual. El primer campo es la posicion 0
   const [ proyectoActualFn ] = proyecto;

   const handleChange = (e) => {
 
     guardarTarea ( {
       ...tarea,
       [e.target.name] : e.target.value
     });
 
   };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validar 
    if ( nombre.trim() === '' ) {
      // validarTareaFn( true );
      validarTareaFn( );
      return;
    }

    // Si es edición o agregar tarea
    if ( tareaseleccionada === null ) {
      // Agregar Tarea
      
      // tarea.proyectoId = proyectoActualFn.id;
      tarea.proyecto = proyectoActualFn._id;//Para mongodb _id
      // tarea.estado = false; en el backEnd no es necesario, porque el Schema el estado esta definido como false. Se genera automatico
  
      // console.log(proyectoActualFn.id);
      // Agregar la nueva tarea al state de tareas
      agregarTareaFn( tarea );
      
    } else {
      // validarTareaFn( false );

      // Actualizar Tarea existente
      // console.log(tarea);
      actualizarTareaFn( tarea );
      // Limpiar tareaseleccionada del state
      limpiarTareaFn();
    }

    // Obtener y fitrar las tareas del proyecto actual
    // console.log(proyectoActualFn._id);
    obtenerTareasFn( proyectoActualFn._id );

    // reiniciar el form
    guardarTarea( {
      nombre: ''
    });

  }; 


  return (
    <div className="formulario">
      <form
        onSubmit= { onSubmit }
      >
        <div className="contenedor-input" >
          <input 
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            onChange= { handleChange }
            value= { nombre}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            // value="Agregar Tarea"
            value={
              tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'
            }
          />
        </div>
      </form>

      {
        ( errortarea )
        ?
          <p className="mensaje error"> Nombre Tarea Obligatorio</p>
        : 
          null
      }
    </div>
  );
}

export default FormTarea;
