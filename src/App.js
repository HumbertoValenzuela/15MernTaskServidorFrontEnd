import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import  ProyectoState  from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import tokenAuth from './config/tokenAuth'
import RutaPrivada from './components/rutas/RutaPrivada';

// Revisar si tenemos un token
const token = localStorage.getItem('token');
if ( token ) {
  // En caso de tener token, entonces utilizar tokenAuth
  tokenAuth( token );//tokenAuth servirá para validar
}

function App() {

  // console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <BrowserRouter>
              {/* Lo que esta fuera de Switch en todas las páginas */}
              <div>
              <Switch>
                {/* Dentro de switch son cada una de las páginas*/}

                {/* Principal */}
                <Route exact path="/" component={ Login } />
                <Route exact path="/nueva-cuenta" component={ NuevaCuenta } />
                <RutaPrivada exact path="/proyectos" component={ Proyectos } />
              </Switch>
              </div>
            </BrowserRouter>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
