import Producto from "./Producto/Producto";
import {useState} from "react";
import './Categorias.css';

function Categorias({
    datosApp,
    onEditarCategoria,
    onEliminarCategoria,
    onEditarProducto,
    onEliminarProducto,
    modoEdicion
}) {

    const [indiceEditando, setIndiceEditando] = useState(null);
    const [nombreEditado, setNombreEditado] = useState('');

    const eliminarCategoria = (index, nombreCategoria) => {
        const confirmar = window.confirm(
            `¿Está seguro que desea eliminar la categoría "${nombreCategoria}" y todos sus productos?`
        );

        if (confirmar) {
            onEliminarCategoria(index);
        }
    };

    const iniciarEdicion = (index, nombreActual) => {
        setIndiceEditando(index);
        setNombreEditado(nombreActual);
    };

    const guardarEdicion = (index, categoria) => {
        const categoriaActualizada = {
            ...categoria,
            nombreCategoria: nombreEditado
        };
        onEditarCategoria(index, categoriaActualizada);
        setIndiceEditando(null);
        setNombreEditado('');
    };

    const cancelarEdicion = () => {
        setIndiceEditando(null);
        setNombreEditado('');
    };

    return (
        <section>
            {datosApp.categorias.map((categoria, indexCategoria) => (
                <div key={indexCategoria}>

                    {modoEdicion && indiceEditando === indexCategoria ?
                        (
                            <div className="categoria-edicion">
                                <input
                                    type="text"
                                    value={nombreEditado}
                                    onChange={(e) => setNombreEditado(e.target.value)}
                                    autoFocus
                                />
                                <button
                                    onClick={() => guardarEdicion(indexCategoria, categoria)}
                                    className="btn-guardar"
                                    title="Guardar cambios"
                                > <img src="/src/assets/aceptar.png" alt="Guardar" /> </button>
                                <button
                                    onClick={cancelarEdicion}
                                    className="btn-cancelar"
                                    title="Cancelar edición"
                                > <img src="/src/assets/cancelar.png" alt="Cancelar" /> </button>
                            </div>
                        ) : (
                            <div className="categoria-header">
                                <img
                                    src={`/src/assets/${categoria.imagenCategoria}`}
                                    alt={categoria.nombreCategoria}
                                />
                                <h2>{categoria.nombreCategoria}</h2>
                                {modoEdicion && (
                                    <div className="categoria-acciones">
                                        <button
                                            onClick={() => iniciarEdicion(indexCategoria, categoria.nombreCategoria)}
                                            className="btn-icon btn-editar"
                                            title="Editar categoría"
                                        >
                                            <img src="/src/assets/editar.png" alt="Editar" />
                                        </button>
                                        <button
                                            onClick={() => eliminarCategoria(indexCategoria, categoria.nombreCategoria)}
                                            className="btn-icon btn-eliminar"
                                            title="Eliminar categoría"
                                        >
                                            <img src="/src/assets/eliminar.png" alt="Eliminar" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    }

                    {categoria.productos.map((producto, indexProducto) => (
                        <Producto
                            key={indexProducto}
                            producto={producto}
                            indexCategoria={indexCategoria}
                            indexProducto={indexProducto}
                            onEditarProducto={onEditarProducto}
                            onEliminarProducto={onEliminarProducto}
                            modoEdicion={modoEdicion}
                        />
                    ))}

                </div>
            ))}
        </section>
    );
}

export default Categorias;