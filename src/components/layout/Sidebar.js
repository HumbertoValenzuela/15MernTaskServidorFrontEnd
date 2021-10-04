import React from 'react';
import ListadoProyectos from '../proyectos/ListadoProyectos';
import NuevoProyecto from '../proyectos/NuevoProyecto';


const Sidebar = () => {
  return (
    <aside>
      <h1>MERN<span>Tasks</span></h1>

      {/*permanece oculto. Pero al presionar button Nuevo Proyecto, mostrar  */}
      <NuevoProyecto />

      <div className="proyectos">
        <h2>Tus Proyectos</h2>

        <ListadoProyectos />
        
      </div>
    </aside>
  )
}

export default Sidebar
