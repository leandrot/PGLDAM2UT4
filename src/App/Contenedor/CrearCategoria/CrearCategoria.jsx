import { useState } from 'react';
import './CrearCategoria.css';

function CrearCategoria({ onCreaCategoria }) {
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [imagenCategoria, setImagenCategoria] = useState('filete.png');

    const handleEnviar = (e) => {
        e.preventDefault();
        if (nombreCategoria.trim()) {
            const nuevaCategoria = {
                nombreCategoria: nombreCategoria,
                imagenCategoria: imagenCategoria,
                productos: []
            };
            onCreaCategoria(nuevaCategoria);
            setNombreCategoria('');
            setImagenCategoria('default.png');
        }
    };

    return (
        <>
            <hr />
            <h3 className="seccion-titulo">Agregar Categoría</h3>
            <div className="crear-categoria">
                <form onSubmit={handleEnviar}>
                    <input
                        type="text"
                        value={nombreCategoria}
                        onChange={(e) => setNombreCategoria(e.target.value)}
                        placeholder="Nombre de la categoría"
                    />
                    <select
                        value={imagenCategoria}
                        onChange={(e) => setImagenCategoria(e.target.value)}
                    >
                        <option value="default.png">Seleccionar imagen</option>
                        <option value="arroz.png">Arroz</option>
                        <option value="filete.png">Carne</option>
                        <option value="fruta.png">Fruta</option>
                        <option value="hamburguesa.png">Hamburguesa</option>
                        <option value="helado.png">Helado</option>
                        <option value="pancho.png">Perritos</option>
                        <option value="pez.png">Pescado</option>
                        <option value="pollo.png">Pollo</option>
                        <option value="taco.png">Tacos</option>
                        <option value="vegetal.png">Vegetariano</option>
                    </select>
                    <button type="submit">Guardar</button>
                </form>
            </div>
        </>
    );
}

export default CrearCategoria;