import React, { useContext, useEffect } from 'react';

import MostrarProyecto from './MostrarProyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';


const ListadoProyectos = ( ) => {

  // Extraer proyectos de state inicial
  const listarproyec = useContext( proyectoContext );

  // Desestructurar
  const { mensaje, proyectos, obtenerProyectosFn } = listarproyec;

  // proyectoState.js se quiere obtenerProyectoFn tan pronto cuando el componente listadoProyecto cargue
  // React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?
  // Es debido a que tiene un return. Se debe posicionar antes

  // Para mostrar mensaje, se agrega alerta y mostrarAlerta
  const alertaContext = useContext( AlertaContext );
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {
    
    // si hay error
    if (mensaje) { 
      // mensaje.msg, mensaje.categoria es porque en el state se tiene una constante de msg y categoria
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyectosFn();
  // eslint-disable-next-line
  }, [ mensaje ]);

  // TypeError: Cannot read properties of undefined (reading 'length')
  // Al mover useEffect hacia arriba marca un error. Pasa cuando se manda a llamar obtenerProyectosFn() - en proyectoState.js se observa que toma un payload que es proyectos. Estos proyectos se tendrían que pasar desde el componente. Los proyectos no vienen de un componente, vendrían de una bbdd. Entonces en lugar de pasar una serie de proyectos obtenerProyectosFn()
  // Revisar si proyecto tiene contenido.
  if ( proyectos.length === 0 ) return <p>Sin proyecto activo</p>;

 

  return (
    <ul className="listado-proyectos">
      
      { alerta   ? ( <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>  ) : null  }

        <TransitionGroup >
          {
            proyectos.map( proyecto => (
              <CSSTransition
                // index.js:1 Warning: Each child in a list should have a unique "key" prop.
                // Check the render method of `ListadoProyectos`.
                // key={ proyecto.id }
                key={ proyecto._id }
                timeout={ 200 }
                classNames="proyecto"
                
              >
                <MostrarProyecto 
                
                  proyecto= { proyecto }
                >
                  
                </MostrarProyecto>
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      
    </ul>
  )
};

export default ListadoProyectos;

