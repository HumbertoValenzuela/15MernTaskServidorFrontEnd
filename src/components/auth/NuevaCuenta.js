import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const NuevaCuenta = (props) => {//props react-router dom

  // extraer valores del context
  const alertaContext =  useContext(AlertaContext);
  const { alerta, mostrarAlerta} = alertaContext;

  const authContext =  useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  // En caso de que el usuario se haya autenticado o registrado o se un registro duplicado
  useEffect(() => {

    if ( autenticado ) {
      props.history.push('/proyectos');
    }

    if ( mensaje ) {
      // leyenda dato del backend
      mostrarAlerta( mensaje.msg, mensaje.categoria)
    }

    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const [usuario, guardarUsuario] = useState( {
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: ''
  });

  // extraer de usuario
  const { nombre, email, password, confirmarPassword } = usuario;

  // Escuchar los Campos
  const onChange = (e) => {

    guardarUsuario( {
      ...usuario,
      [e.target.name] : e.target.value
    });

  };

  // Access to XMLHttpRequest at 'http://localhost:4000/api/usuarios' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

  // Error indica que se tiene el frontEnd y backEnd en URL diferentes
  // agregar CORS en el Backend, para permitir cambios de recursos entre dominios

  // Cuando el usuario quiere iniciar sesión
  const onSubmit = e => {
    e.preventDefault();

    // Validar campos vacios
    if ( nombre.trim() === '' ||
         email.trim() === '' || 
         password.trim() === '' || 
         confirmarPassword.trim() === '' ) {
      //  resive msg y categoria de error
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    // Password minimo 6 caracteres
    if (password.length < 6) {
      mostrarAlerta('Password mínimo 6 caracteres', 'alerta-error');
      return;
    }

    // Los dos password son iguales
    if (password !== confirmarPassword) {
      mostrarAlerta('Password no son iguales', 'alerta-error');
      return;
    }
    // Pasarlo al action
    registrarUsuario({
      nombre,
      email,
      password
    })
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
        <h1>Registrar</h1>

        <form onSubmit={onSubmit}>

          <div className="campo-form" >
            <label htmlFor="nombre" >Nombre</label>
            <input 
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Escribe tu Nombre"
              onChange={ onChange }
              value= { nombre }
            />
          </div>

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

          <div className="campo-form" >
            <label htmlFor="confirmarPassword" >Password</label>
            <input 
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              placeholder="Repite tu Contraseña"
              onChange={ onChange }
              value= { confirmarPassword }
            />
          </div>

          <div>
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registra tu Cuenta"
            />
          </div>

        </form>

        {/* Enlace a nueva-cuenta  */}
        <Link to={"/"} className="enlace-cuenta">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  )
}

export default NuevaCuenta
