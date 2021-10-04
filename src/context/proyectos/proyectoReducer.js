import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTOS, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR } from "../../types";


export const proyectoReducer = (state, action) => {
  switch (action.type) {

    case FORMULARIO_PROYECTO:
      return {
        ...state,
        nuevoProyectoFormulario: true
      }

    case OBTENER_PROYECTOS:
      // console.log( action);
      return {
        ...state,
        proyectos: action.payload
      }

    case AGREGAR_PROYECTOS:
      // console.log( action.payload);
      return {
        ...state,
        // Contenido actual(arreglo de objeto), y el nuevo proyecto(se agrega al contenido actual)
        proyectos: [ ...state.proyectos, action.payload ],
        // se oculta el form con el input, pero queda el valor. cambio realizar en el state
        nuevoProyectoFormulario: false,
        // Quitar Mensaje error no debe ser vacio
        errorFormulario: false
        
      }

    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorFormulario: true,
      }

    case PROYECTO_ACTUAL:
      // en mongodb es _id
      return {
        ...state, 
        proyecto: state.proyectos.filter( proyecto => proyecto._id === action.payload)
      }
    
    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyectos: state.proyectos.filter( proyecto => proyecto._id !== action.payload),
        proyecto: null
      }
  
    case PROYECTO_ERROR:
      return {
        ...state,
        // Contiene la alerta
        mensaje: action.payload
      }

    default:
      return state;
  }
}