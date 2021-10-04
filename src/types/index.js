// Types: de esta forma podemos importar sin especificar el nombre

// import Tarea from "../components/tareas/Tarea";

// Describir lo que pasa en la aplicación.
export const FORMULARIO_PROYECTO = 'FORMULARIO_PROYECTO';
export const OBTENER_PROYECTOS = 'OBTENER_PROYECTOS';
export const AGREGAR_PROYECTOS = 'AGREGAR_PROYECTOS';
export const VALIDAR_FORMULARIO = 'VALIDAR_FORMULARIO';
export const PROYECTO_ACTUAL = 'PROYECTO_ACTUAL';
export const ELIMINAR_PROYECTO = 'ELIMINAR_PROYECTO';
export const PROYECTO_ERROR = 'PROYECTO_ERROR';

export const TAREAS_PROYECTO = 'TAREAS_PROYECTO';
export const AGREGAR_TAREA = 'AGREGAR_TAREA';
export const VALIDAR_TAREA = 'VALIDAR_TAREA';
export const ELIMINAR_TAREA = 'ELIMINAR_TAREA';
export const ESTADO_TAREA = 'ESTADO_TAREA';
export const TAREA_ACTUAL = 'TAREA_ACTUAL';
export const ACTUALIZAR_TAREA = 'ACTUALIZAR_TAREA';
export const LIMPIAR_TAREA = 'LIMPIAR_TAREA';

export const MOSTRAR_ALERTA = 'MOSTRAR_ALERTA';
export const OCULTAR_ALERTA = 'OCULTAR_ALERTA';

// Autenticacion
export const REGISTRO_EXITOSO = 'REGISTRO_EXITOSO';
// usuario registrarse y exista el correo
export const REGISTRO_ERROR = 'REGISTRO_ERROR';
// usuario inicia sesión obtener el usuario
export const OBTENER_USUARIO = 'OBTENER_USUARIO';
export const LOGIN_EXITOSO = 'LOGIN_EXITOSO';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CERRAR_SESION = 'CERRAR_SESION';

// export const LIMPIAR_TAREA = 'LIMPIAR_TAREA';
// export const LIMPIAR_TAREA = 'LIMPIAR_TAREA';
// export const LIMPIAR_TAREA = 'LIMPIAR_TAREA';


// 208 Mostrando el Nombre del Proyecto
// Primera vez que carga no tiene ningun proyecto al cual asociar las tareas.  actualizar según damos clic en Tus Proyectos
// Agregar el context y agregar el campo proyecto(arrayObject). Es un arreglo acceder por posición o por [array destructuring]
// Si no hay proyecto entonces <h2>selecciona un proyecto

// 209 Ocultando el Formulario de Tareas si no hay Proyecto Seleccionado
// Importar el context, extraer proyecto activo.
// return null si no tiene proyecto activo

// 210 Eliminar Proyectos. Types ELIMINAR_PROYECTO.
// proyectoState: crear funcion eliminarProyecto obtener el id
// dispatch type, payload id. eliminarProyecto pasar al proyectoContext.Provider
// proyectoReducer: proyectos: !==
// ListadoTareas: extraer eliminarProyecto. onClickEliminar. Funcion onClickEliminar colocar eliminarProyecto(proyectoActual.id)
// proyectoReducer: ELIMINAR_PROYECTO agregar proyecto: null. Para resetear
// ListadoProyecto: Si no tiene <p>comienza creando uno</p>

 // 213 Creando una función que obtenga las tareas del Proyecto
  // basado en los id de proyecto, se seleccionaran los id de tareas que están en initialState
  // Types TAREAS_PROYECTO. Agregar types al tareaState. Crear Función obtenerTareas por el id, dispatch type payload.
  // TareaContext.provider agregar función obtenerTareas
  // Agregar en MostrarProyecto proyectoActual y obtenerTareas van juntos
  // MostrarProyecto: crear función seleccionarProyecto = id, agregar el proyecto actual y obtener tareas.
  // Agregar el context para obtener tareas

  // 214 Filtrando las tareas por proyecto
//tareaReducer: importar type TAREAS_PROYECTO. case tareasproyecto: filter tarea.proyectoId
// tareaState initialstate campo tareaProyecto:null. pasar al TareaContext.Provider.
// Ver devtools - TareaState reducer - tareas - tareasproyecto
//ListadoTareas: usar el tareaContext - tareasproyecto. Eliminar tareasProyecto = []

// 215 Creando un dispatch para nuevas tareas
// agregar type AGREGAR_TAREA
// tareaState: import AGREGAR_TAREA. agregarTareaFn = dispatch type payload: tarea. agregar al context
// reducer: type, case tareas: [ ...state.tareas, action.payload]
// formTarea: onSubmit {onSubmit}

// 216 Insertando tareas en el Proyecto Actual
// FormTarea: useState tarea. initialstate nombre: '', extraer nombre. agregar al input -value
// handleChange para obtener los datos del formulario.
// agregar el id, y estado
// Agregar un context con la Fn agregarTarea. agregarTareaFn( tarea )

// 217 Validando el Formulario y algunos ajustes
// tareaState: initialState: errortarea: false, pasar al context
// type: VALIDAR_TAREA
// validarTareaFn dispatch type no lleva payload, pasar al context
// tareaReducer errortarea: true
// formTarea agregar al context validarTarea
// onSubmit if(nombre.trim === ''){ validarTarea return}
// Termina el </form> { errortarea ? <p> class mensaje error'> nombre de la tarea obligatorio : null}
// tareaReducer - agregar_tarea - errortarea: false
// reiniciarform guardarTarea nombre: ''
// FormTarea: obtenerTareasFn

// 218 Eliminando Tareas
// type: ELIMINAR_TAREA
// tareaState: eliminar tarea por id. eliminarTareaFn dispatch type : ELIMINAR_TAREA payload. pasar FN al context
// reducer: tareas: state.tareas.filter( tarea.id !== action.payload)
// Tarea.js: context eliminarTareaFn. 
// tareaEliminar (id). eliminar onClick { tareaEliminar( tarea.id )}
// extraer obtenerTareasFn agregar a la Fn tareaEliminar
// Obtener referencia id del proyecto
// Recargar listado una vez eliminado una tarea
// agregar context proyecto. obtenerTareasFn(proyecto[0].id)
// o aplicar destructuring al id de proyecto
// const [ proyectoActual] = proyecto
// obtenerTareas(proyectoActual.id) sin posición. con destructiring es por posición, el primer termino sería el id, segundo el nombre, tercero estado, cuarto proyectoId
// ListadoTareas: Key= { tarea.id}

// 219 Agregando una animación cuando se crean nuevas tareas
// npm i react-transition-group se utiliza como un componente
// TransitionGroup y CSSTransition no añede animaciones. Se encarga de agregar las clases creadas en index.css
// ListadoTareas -
// TareaReducer - orden de AGREGAR_TAREA primero el registro y luego el contenido anterior
// [action.payload, ...state.tareas ]

// 221 Modificar el Estado de una tarea
// type ESTADO_TAREA
// tareaState: cambiar el estado de cada tarea. pasar el objeto completo una vez que hagamos el cambio
// cambiarEstadoTarea dispatch type payload tarea. pasar al context
// Tarea: usar cambiarEstadoTarea en el context
// Funcion que modifica el estado de las tareas
// cambiarEstado = tarea. if tarea.estado false else true
// cambiarEstadoTarea( tarea )
// agregarlos a los button onClick { () => cambiarEstado(tarea)}
// Reducer: tareas: state.tareasproyecto.map( tarea.id === action.payload.id ? action.payload : tarea)

// 222 Seleccionando una Tarea para poderla editar
// Al presionar el boton Editar marque la tarea en la parte superior y cambiar la interface
// type: TAREA_ACTUAL state de tareaactual detectado entonces formulario cambiará.
// tareaState: crear función guardarTareaActual dispatch type payload. pasar función al context.
// Tarea: abrir cada una de las tareas, ver el botón de editar y agregar al context la función guardarTareaActual
// En el botón editar agregaruna función onclick () => seleccionarTarea(tarea), dentro de la función agregar la funcion guardarTareaActual(tarea)
// tareaState: definir un nuevo state porque ahí se coloca la nueva tarea, llamada tareaseleccionada. Agregar al initialState como null. agregar al contextprovider.
// tarea}Reducer: tareaseleccionada: action.payload
// porque payload de la función guardarTareaActualFn va a ser la tarea completa y es lo que se esta pasando en Tarea.js seleccionarTarea

// 223 Cargando la tarea en el formulario. Al tener la tarea seleccionada, colocar el tenxto en el input y el boton modificarlo de agregartarea a editar tarea
// FormTarea: extraer tareaseleccionada al context y usar useEffect para cargar una parte del componente y que detecta si hay una tarea seleccionada. If tareaselecionada !== null entonces usar el state de guardarTarea(tareaseleccionada) else guardarTarea({ nombre: ''}). la dependencia es tareaseleccionada. Con esto, al presionar el boton editar se carga el valor al input del formulario.
// Al presionar el boton editar de la lista de tarea, entonces cambiar el boton del formulario de agregar tarea a editar tarea

// 224 Modificando la tarea
// FormTarea: utilizar el onSubmit para editar y agregar tarea
// Si tareaseleccionada tiene dato es editar si esta vacia entonces es agregar 
// tareaState: actualizarTareaFn dispatch payload y agregar al context provider.
// FormTarea: tareaseleccionada === null entonces agregar tarea de lo contrario actualizarTareaFn
// tareaReducer: ACTUALIZAR_TAREA tareas: state.tareas.map( tarea => tarea.id === action.payload.id ? action.payload : tarea)

// 225 Limpiando la tarea seleccionada
// editar tarea: editar - modificar - editar - muestra tarea modificada - input queda vacio pero el state de tareaseleccionada sigue con datos. esto debe quedar en null

// Forma facil es agregar en el tareaReducer actualizarTarea: tareaseleccionada: null

// Otra forma de realizar utilizando los context
// type: LIMPIAR_TAREA
// tareaState: limpiarTareaFn sin payload
// FormTarea: onSubmit - actualizartarea - agregar función limpiarTareaFn();
// tareaReducer: case y tareaseleccionada a null
// Agregar id a tareaState

// 258 Creando el State de alertas
// crear reducer state context para el alerta de Nueva Cuenta

// 259 Validando que no haya campos vacíos y mostrando alertas
// NuevaCuenta AlertaContext

// 265 Autenticar y redirigir al usuario
// Al registrar y autenticar se redirige al dashboard pero tambien en caso de error , mostrar mensaje de error
// NuevaCuenta:  extraer mensaje y autenticado(caso que se registra correctamente). Usar useEffects al tanto de cambios que ocurre y va a recargar o hacer ajustes. Dependencia mensaje autenticado props.history

// 266 Obteniendo información del usuario autenticado
// authState:retorna el usuario autenticado. Sirve para cuando crea una cuenta como inicio sesión. configuracón de headers de x-auth-token hacia el backEnd
// usuarioAutenticado obtener token de localStorage. axios auth
// backEnd auth.js y auth controller router.get obtiene el usuario autenticado.

// 267 Enviando el Token por headers
// Error: Request failed with status code 401
// Crear en el frontEnd config - tokenAuth.js para pasar el token por headers 
// authState usuarioAutenticado obtiene el objeto usuario
// console.log(respuesta); viene el password, no mostrar.
// Ir al backend - authController - usuarioAutenticado
// .select('-password) con esto no envia el password

// 270 Autenticar al usuario incluso si se recarga la app
// Una vez autenticado, en el reducer esta el token autenticado usuario mensaje, esto al recargar página todos los datos se pierden menos el token(debido a que esta en localstorage)
// Abrir App.js revisar si tiene un token
// Para usar la info del usuario se necesita usuarioAutenticado de authState. Pasar la Fn al context.provider
// en Proyectos - usar la Fn en un useEffect

// 271 Mostrando información del usuario autenticado
// Barra.js importar el context , extraer usuario, usuarioAutenticado
// Barra la primera vez no tendrá usuario, usar el ternario(if)

// 272 Cerrar sesión de usuario, token,
// authState crear Fn cerrarSesion. añadir al context.provider
// authReducer usuario null autenticado null, token null
// OBTENER_USUARIO autenticado true
// Barra.js añadir la funcion cerrarsesion al boton

// 273 Proteger Componentes
// RutaPrivada. Un higher order component, es un componente que toma otro componente dentro de el
// Importar rutaprivada a App.js

// 274 Solucionando un problema con la protección del Componente
// Al iniciar sesion y estando proyecto al recargar pagina se nota un cambio a login. es debido a que autenticado demora en cambiar a true.
// solucion crear otro State

// Creacion y Administración de Proyectos
// 275 Creando el Proyecto
// unir interfaz. agregarProyectoFn
// const resultado = clienteAxios.post('/api/proyectos', proyecto)
// console.log(resultado); ver que vienen valores proyectos
// debe ser resultado.proyectos


// 276 Listando y creando los Proyectos
// proyectoReducer.js
// Uncaught TypeError: proyectos.map is not a function.
      // para Solucionar crear un log. en el reducer obtener_proyectos y ver que entrega la API. En teoría se esta enviando algo más o algo menos. Se observa en el log que se esta mandando proyectos, por lo tanto agregar .data.proyectos
// console.log("obtener Proyecto" + action.payload);
// resultado.data.proyectos
// listadoProyectos
 // index.js:1 Warning: Each child in a list should have a unique "key" prop. // Check the render method of `ListadoProyectos`.
//  Esto es debido a que mongo el id le agrega al principio un guión bajo _id

// 277 Obtener un Proyecto en activo
// PROYECTO_ACTUAL es donde se agregan las tareas
// Al dar clic en proyecto - se actualiza el titulo de tareas, y además poder  agregar las tareas del proyecto actual.
// proyecto.js
// agregar para que lea mongodb el _id
// Notar que ProyectoState - proyecto  estará activo

// 278 Eliminar el Proyecto 
// ListadoTareas.js al presionar clic en Eliminar - onClickEliminar - proyectoActual._id. mongodb crea el id con _id

// 279 Mostrando alerta si hay errores
// eliminarProyectoFn - (`/api/proyectos/${1}`); colocar 1. indicará un error 500
// DELETE http://localhost:4000/api/proyectos/1 500 (Internal Server Error)
// Esto sirva para debugear pero al usuario no le sirve.
// Entonces. Agregar un type PROYECTO_ERROR. en proyectoState eliminarProyectoFn agregar en el catch un payload type payload. initialState agregar mensaje: null. Agregar al proyectoContext.provider
// proyectoReducer agregar PROYECTO_ERROR
// ListadoProyectos - agregar el context - Para mostrar mensaje, se agrega alerta y mostrarAlerta
// En el useEffect agregar el mensaje
// Agregar en el html la alerta con el mensaje

// 280 Insertando Tareas uniendo backend frontend
// initialstate - tareas(array) solo se ocupa para que funcione en el frontEnd, quitar. quitar del context.Provider
// tareaReducer: // TypeError: Cannot read properties of undefined (reading 'filter') esto pasa por el tareaReducer
// Se hace referencia a tareas y ya no existe. Reemplazar por tareasproyecto.
// TypeError: Cannot read properties of null (reading 'filter')
// En initialState las tareasproyecto: null modificar a un Array vacio []
// xhr.js:187 POST http://localhost:4000/api/tareas 400 (Bad Request)
// se debe pasar el proyecto al cual se esta creando para que se genere la relación y puede traer las tareas de aquel proyecto
// Ir a FormTarea - onSubmit
// Modificar proyectoActualFn.id; a _id
// En el backend Servidor\routes\tareas.js api/tareas se encia nombre y proyecto. en el model Servidor\Models\Tarea.js notar que tambien se guarda como proyecto.
// Entonces al conocer los datos del backEnd ir a FormTarea y modificar
//  tarea.proyectoId a  tarea.proyecto
//Para mongodb _id
// tarea.estado = false; en el backEnd no es necesario, porque el Schema el estado esta definido como false. Se genera automatico

// 281 Obteniendo las tareas del Proyecto
// Al agregar una tarea, se van agregando a la lista y al recargar la página no se mantienen. además al clic en proyecto no aparece la lista de tareas
// tareaState.js obtenerTareasFn - cada tarea debe de tener el proyecto.
// tareaController- obtenerTareas en  const { proyecto } = req.body; se debe pasar el proyecto en el qu esta. Esto se realiza para quien esta autenticado sea quien creo el proyecto tambien para que sea un proyecto existente.
// cliente\src\components\proyectos\MostrarProyecto.js - proyectoActualFn( id ); obtenerTareasFn( id ); se pasa en ambos el id
// tareaState - obtenerTareasFn se pasará proyecto como params (otra forma de hacerlo)
// Al pasar como params en tareaController - obtenerTareas -  console.log( req.body ); Al ver en la terminal se encuentra vacio
// Cuando se envia params se lee en el controlador como req.query, queda así { proyecto: '61552dafa809e0de8469c8ee' }
// Por tanto reemplazar de req.body a req.query
// Ir tareaState y revisar el log resultado entrega un objeto con datos data.tareas ahí se encuentra la tarea del proyecto seleccionado,  ese es el payload
// tareaReducer - TAREAS_REDUCER - tareasproyecto: action.payload
// La API ya lo tiene filtrado entonces solo se debe mostrar el resultado
// Para realizar ordenar ir a tareaController - obtenerTareas
// const tareas = await Tarea.find( { proyecto } );
// const tareas = await Tarea.find( { proyecto } ).sort({ creado: -1});
// para cambiar el orden. para mostrar las mas nuevas primero

// 282 Eliminando Tareas
// cliente\src\components\tareas\Tarea.js tareaEliminar
// En el boton Eliminar se debe cambiar a _id por mongodb y el action es eliminarTarea.
// Ir a tareaState - eliminarTareaFn 
// tareaController eliminarTareas tambien se pasa el proyecto. Por tanto agregar en componente Tarea.js el proyecto
// eliminarTareaFn( id, proyectoActual._id );// pasar el _id hacia el backEnd
// para comprobar que somos los creadores del proyecto
// tareaState - ir a la action - y agregar el paramentro proyectoactual

// 283 Actualizar Tareas
// Editar tarea y incompleto completo
// tareaState: Colocar cambiarEstadoTareaFn y actualizarTareaFn
// Quitando la función cambiarEstadoTareaFn y reemplazar por actualizarTareaFn
// tareaReducer: modificar ACTUALIZAR_TAREA
// Con esto es posible clic y cambiar a completo. pero no es posible cambiar a imcompleto. solución
// tareaController: // Al mandar el objeto completo quitar los if
// cliente\src\components\tareas\ListadoTareas.js
// key= {tarea._id}

// 284 Solucionando los warnings de React
// Eliminar dependencia de desarrollo uuid
// npm uninstall --save uuid