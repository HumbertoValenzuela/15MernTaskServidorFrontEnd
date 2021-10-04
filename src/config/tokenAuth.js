import clienteAxios from './axios';

const tokenAuth = token => {
  // Si al usuario se esta pasando un token
  if ( token) {
    // Pasar a los default del headers
    clienteAxios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // Al cerrar sesión o token expirado. Se elimina del headers
    delete clienteAxios.defaults.headers.common['x-auth-token'];
  }

}

export default tokenAuth;