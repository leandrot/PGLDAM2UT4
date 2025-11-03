import { useState } from 'react';
import './Producto.css';

function Producto({
    producto,
    indexCategoria,
    indexProducto,
    onEditarProducto,
    onEliminarProducto,
    modoEdicion
}) {

    const [modoEdicionProducto, setModoEdicionProducto] = useState(false);
    const [nombreEditado, setNombreEditado] = useState(producto.nombreProducto);
    const [precioEditado, setPrecioEditado] = useState(producto.precioProducto);

    const guardarProducto = () => {
        const productoActualizado = {
            nombreProducto: nombreEditado,
            precioProducto: parseFloat(precioEditado)
        };
        onEditarProducto(indexCategoria, indexProducto, productoActualizado);
        setModoEdicionProducto(false);
    };

    const cancelarEditarProducto = () => {
        setNombreEditado(producto.nombreProducto);
        setPrecioEditado(producto.precioProducto);
        setModoEdicionProducto(false);
    };

    const eliminarProducto = () => {
        const confirmar = window.confirm(
            `¿Está seguro que desea eliminar "${producto.nombreProducto}"?`
        );
        if (confirmar) {
            onEliminarProducto(indexCategoria, indexProducto);
        }
    };

    return (
        <div className="producto">
            {modoEdicion && modoEdicionProducto ? (
                <div className="producto-edicion">
                    <input
                        type="text"
                        value={nombreEditado}
                        onChange={(e) => setNombreEditado(e.target.value)}
                    />
                    <input
                        type="number"
                        step="0.01"
                        value={precioEditado}
                        onChange={(e) => setPrecioEditado(e.target.value)}
                    />
                    <button onClick={guardarProducto} className="btn-guardar" >
                        <img src="/src/assets/aceptar.png" alt="Guardar" />
                    </button>
                    <button onClick={cancelarEditarProducto} className="btn-cancelar" >
                        <img src="/src/assets/cancelar.png" alt="Cancelar" />
                    </button>
                </div>
            ) : (
                <>
                    <div>{producto.nombreProducto}</div>
                    <div>
                        ${producto.precioProducto.toFixed(2)}
                        {modoEdicion && (
                            <div className="producto-acciones">
                                <button
                                    onClick={() => setModoEdicionProducto(true)}
                                    className="btn-icon btn-editar"
                                    title="Editar"
                                ><img src="/src/assets/editar.png" alt="Editar" /></button>
                                <button
                                    onClick={eliminarProducto}
                                    className="btn-icon btn-eliminar"
                                    title="Eliminar"
                                ><img src="/src/assets/eliminar.png" alt="Eliminar" /></button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Producto;
