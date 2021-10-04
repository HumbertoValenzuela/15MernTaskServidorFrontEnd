import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

  // extraer valores del context
  const alertaContext =  useContext(AlertaContext);
  const { alerta, mostrarAlerta} = alertaContext;

  const authContext =  useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

    //En caso de que el password o usuario no exista
    useEffect(() => {

      if ( autenticado ) {
        props.history.push('/proyectos');
      }
  
      if ( mensaje ) {
        // leyenda dato del backend
        mostrarAlerta( mensaje.msg, mensaje.categoria)
      }

    // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);//Line 26:31:  'props' is not defined . Agregar props en login

  const [usuario, guardarUsuario] = useState( {
    email: '',
    password: ''
  });

  // extraer de usuario
  const { email, password } = usuario;

  // Escuchar los Campos
  const onChange = (e) => {

    guardarUsuario( {
      ...usuario,
      [e.target.name] : e.target.value
    });

  };

  // Cuando el usuario quiere iniciar sesión
  const onSubmit = e => {
    e.preventDefault();

    // Validar campos vacios
    if ( email.trim() === '' || password.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
    }
    // Pasarlo al action
    iniciarSesion( { email, password } );
  }

  return (
    <div className="form-usuario">
       {
        alerta
        ? 
          ( 
            <div 
              className={ `alerta ${alerta.categoria}` } >
                {alerta.msg}
            </div>
          )
        : null
      }
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={onSubmit}>

          <div className="campo-form" >
            <label htmlFor="email" >Email</label>
            <input 
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              onChange={ onChange }
              value= { email }
            />
          </div>

          <div className="campo-form" >
            <label htmlFor="password" >Password</label>
            <input 
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              onChange={ onChange }
              value= { password }
            />
          </div>

          <div>
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>

        </form>

        {/* Enlace a nueva-cuenta  */}
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  )
}

export default Login
