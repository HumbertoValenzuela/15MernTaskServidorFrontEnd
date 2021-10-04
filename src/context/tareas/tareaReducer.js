import { 
  AGREGAR_TAREA, 
  ELIMINAR_TAREA, 
  // ESTADO_TAREA, 
  TAREAS_PROYECTO, 
  TAREA_ACTUAL, 
  VALIDAR_TAREA, 
  ACTUALIZAR_TAREA, 
  LIMPIAR_TAREA } from "../../types";

const tareaReducer = (state, action) => {
  switch (action.type) {    
  
    case TAREAS_PROYECTO:
      return {
        ...state,
        // se quita debido a que la API ya entrega la respuesta filtrado
        // tareasproyecto: state.tareasproyecto.filter( tarea => tarea.proyectoId === action.payload )
        tareasproyecto: action.payload//recibe la respuesta data.tareas
      }
    
    case AGREGAR_TAREA:
      return {
        ...state,
        // Dato actual luego registro nuevo
        tareasproyecto: [...state.tareasproyecto, action.payload],
        // Registro nuevo luego datos actuales
        // tareas: [ action.payload, ...state.tareasproyecto ],
        errortarea: false
      }
    
    case VALIDAR_TAREA:
      return {
        ...state,
        errortarea: true
      }

    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.filter( tarea => tarea._id !== action.payload )
      }

    case ACTUALIZAR_TAREA:
    // case ESTADO_TAREA:
      return {
        ...state,
        // Tarea modificada y el objeto completo
        tareasproyecto: state.tareasproyecto.map( tarea => tarea._id === action.payload._id ? action.payload : tarea),
        errortarea: false
      }

    case TAREA_ACTUAL:
      return {
        ...state,
        tareaseleccionada: action.payload,
        errortarea: false
      }

    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaseleccionada: null
      }

    default:
      return state;
  }
}

export default tareaReducer;
