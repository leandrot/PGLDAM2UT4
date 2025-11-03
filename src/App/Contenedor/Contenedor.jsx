import Cabecera from "./Cabecera/Cabecera";
import Categorias from "./Categorias/Categorias.jsx";
import Pie from "./Pie/Pie";
import CrearCategoria from "./CrearCategoria/CrearCategoria.jsx";
import CrearProducto from "./Categorias/CrearProducto/CrearProducto.jsx";
import {useState} from "react";
import './Contenedor.css';

function Contenedor({
    datosApp,
    onCreaCategoria,
    onEditarCategoria,
    onEliminarCategoria,
    onCreaProducto,
    onEditarProducto,
    onEliminarProducto
}) {
    const [modoEdicion, setModoEdicion] = useState(false);

    const cambiaModoEdicion = (e) => {
        e.preventDefault();
        setModoEdicion(!modoEdicion);
    };

    return (
        <div className="container">
            <main>
                <Cabecera
                    datosApp={datosApp}
                />
                <Categorias
                    datosApp={datosApp}
                    onEditarCategoria={onEditarCategoria}
                    onEliminarCategoria={onEliminarCategoria}
                    onEditarProducto={onEditarProducto}
                    onEliminarProducto={onEliminarProducto}
                    modoEdicion={modoEdicion}
                />
                <Pie
                    datosApp={datosApp}
                />
                {modoEdicion && (
                    <>
                        <CrearCategoria
                            onCreaCategoria={onCreaCategoria}
                        />
                        <CrearProducto
                            datosApp={datosApp}
                            onCreaProducto={onCreaProducto}
                        />
                    </>
                )}
                <hr />
                <a href="#" onClick={cambiaModoEdicion} className="cambiar-edicion">
                    {modoEdicion ? 'Desactivar edición' : 'Activar edición'}
                </a>
            </main>
        </div>
    );
}

export default Contenedor;
