import React, { useReducer } from 'react';
import {alertaReducer} from './alertaReducer';
import alertaContext from './alertaContext';

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types/index';

const AlertaState = props => {

  const initialState = {
    alerta: null
  }

  // Array destructiring
  const [ state, dispatch] = useReducer(alertaReducer, initialState);

  // Funciones
  const mostrarAlerta = ( msg, categoria ) =>{

    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        // object literal enjansmen msg categoria solo
        msg: msg,
        categoria: categoria
      }
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 5000);
  }
  return (
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta
      }}
    >
      {props.children}
    </alertaContext.Provider>
  )
}
export default AlertaState;