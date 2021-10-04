import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext'

// Creacion y Administración de Proyectos
// 275 Creando el Proyecto

// higher order component RutaPrivada tendrá un componente dentro llamado Component
const RutaPrivada = ( { component: Component, ...props } ) => {

  console.log('Ruta Privada' + props);

  const authContext = useContext( AuthContext )
  const { autenticado, cargando, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, [])
  return (
    <Route
      { ... props }
      // la sintaxis de render, antes de dar por implicito un return y revisar ciertas condiciones. el return se da por implicito con los parentesis
      render= 
      { props => 
          !autenticado && !cargando
          ? 
            (
              <Redirect to="/" />
            )
          :  
            (
              <Component { ...props } />
            )    
      }
    >
    </Route>
  );

}

export default RutaPrivada
