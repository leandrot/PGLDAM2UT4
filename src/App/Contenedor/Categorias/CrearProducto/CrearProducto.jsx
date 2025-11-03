import { useState } from 'react';
import './CrearProducto.css';

function CrearProducto({ datosApp, onCreaProducto }) {
    const [nombreProducto, setNombreProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    const handleEnviar = (e) => {
        e.preventDefault();

        if (nombreProducto.trim() && precioProducto && categoriaSeleccionada !== '') {
            const nuevoProducto = {
                nombreProducto: nombreProducto,
                precioProducto: parseFloat(precioProducto)
            };

            onCreaProducto(parseInt(categoriaSeleccionada), nuevoProducto);

            setNombreProducto('');
            setPrecioProducto('');
            setCategoriaSeleccionada('');
        } else {
            alert('Por favor complete todos los campos');
        }
    };

    return (
        <>
            <hr />
            <h3 className="seccion-titulo">Agregar Producto</h3>
            <div className="crear-producto">
                <form onSubmit={handleEnviar}>
                    <input
                        type="text"
                        value={nombreProducto}
                        onChange={(e) => setNombreProducto(e.target.value)}
                        placeholder="Nombre del producto"
                        style={{ marginRight: '10px', padding: '5px' }}
                    />
                    <input
                        type="number"
                        step="0.01"
                        value={precioProducto}
                        onChange={(e) => setPrecioProducto(e.target.value)}
                        placeholder="Precio"
                        style={{ marginRight: '10px', padding: '5px', width: '100px' }}
                    />
                    <select
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        style={{ marginRight: '10px', padding: '5px' }}
                    >
                        <option value="">Seleccionar categoría</option>
                        {datosApp.categorias.map((categoria, index) => (
                            <option key={index} value={index}> {categoria.nombreCategoria} </option>
                        ))}
                    </select>
                    <button type="submit" style={{ padding: '5px 15px', cursor: 'pointer' }}> Guardar </button>
                </form>
            </div>
        </>
    );
}

export default CrearProducto;
