import { useState, useEffect } from 'react'
import './App.css'
import Contenedor from "./Contenedor/Contenedor.jsx";
import Avisos from "./Contenedor/Avisos/Avisos.jsx";

function App() {

    const datosIniciales = {
        nombreCafeteria: "Camper Cafe",
        anoInauguracion: 2020,
        categorias: [],
        datosPie: {
            sitioWeb: "https://freecodecamp.org",
            direccion: "123 Free Code Camp Drive"
        }
    };

    const [datosApp, setDatosApp] = useState(datosIniciales);
    const [aviso, setAviso] = useState(null);

    const mostrarAviso = (mensaje, tipo) => {
        setAviso({ mensaje, tipo });
    };

    const cerrarAviso = () => {
        setAviso(null);
    };

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const response = await fetch('https://jlorenzo.ddns.net/carta_restaurante/categorias/?usuario_id=0912');
                const resultado = await response.json();

                const categoriasConProductos = await Promise.all(
                    resultado.data.map(async (categoria) => {
                        try {
                            const productosrespuesta = await fetch(
                                `https://jlorenzo.ddns.net/carta_restaurante/productos/${categoria.id}?usuario_id=0912`
                            );
                            const productos = await productosrespuesta.json();

                            return {
                                id: categoria.id,
                                nombreCategoria: categoria.nombre,
                                imagenCategoria: "restaurante.png", // se fuerza este valor porque la API no lo proporciona
                                productos: productos.data ? productos.data.map(prod => ({
                                    id: prod.id,
                                    nombreProducto: prod.nombre,
                                    precioProducto: parseFloat(prod.precio)
                                })) : []
                            };
                        } catch (error) {
                            console.error(`Error al cargar productos de categoría ${categoria.id}:`, error);
                        }
                    })
                );
                setDatosApp({ ...datosIniciales, categorias: categoriasConProductos });
            } catch (error) {
                mostrarAviso('Error al cargar los datos de la carta', 'error');
                console.error('Error al cargar datos:', error);
            }
        };

        cargarDatos();
    }, []);

    const CrearCategoria = async (nuevaCategoria) => {
        try {
            const response = await fetch('https://jlorenzo.ddns.net/carta_restaurante/categorias/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario_id: "0912",
                    nombre: nuevaCategoria.nombreCategoria
                })
            });
            const result = await response.json();

            const datosActuales = datosApp;
            datosActuales.categorias.push({
                id: result.categoria_id,
                nombreCategoria: nuevaCategoria.nombreCategoria,
                imagenCategoria: nuevaCategoria.imagenCategoria || "restaurante.png",
                productos: []
            });
            setDatosApp({...datosActuales});
            mostrarAviso('Categoría creada correctamente', 'success');
        } catch (error) {
            mostrarAviso('Error al crear la categoría', 'error');
            console.error('Error al crear categoría:', error);
        }
    };

    const EliminarCategoria = async (posicion) => {
        try {
            const categoria = datosApp.categorias[posicion];

            const response = await fetch(`https://jlorenzo.ddns.net/carta_restaurante/categorias/${categoria.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario_id: "0912"
                })
            });

            const result = await response.json();

            if (result.status === 'success') {
                const categorias = datosApp.categorias.filter((categoria, index) => index !== posicion);
                setDatosApp({...datosApp, categorias});
                mostrarAviso('Categoría eliminada correctamente', 'success');
            }
        } catch (error) {
            mostrarAviso('Error al eliminar la categoría', 'error');
            console.error('Error al eliminar categoría:', error);
        }
    };

    const EditarCategoria = async (posicion, nuevaCategoria) => {
        try {
            const categoria = datosApp.categorias[posicion];

            const response = await fetch(`https://jlorenzo.ddns.net/carta_restaurante/categorias/${categoria.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario_id: "0912",
                    nombre: nuevaCategoria.nombreCategoria,
                    orden: posicion
                })
            });

            const result = await response.json();

            if (result.status === 'success') {
                const categorias = datosApp.categorias.map((categoria, index) => {
                    if (index === posicion) {
                        return {
                            ...categoria,
                            ...nuevaCategoria
                        };
                    }
                    return categoria;
                });
                setDatosApp({...datosApp, categorias});
                mostrarAviso('Categoría editada correctamente', 'success');
            }
        } catch (error) {
            mostrarAviso('Error al editar la categoría', 'error');
            console.error('Error al editar categoría:', error);
        }
    };

    const CrearProducto = async (indexCategoria, nuevoProducto) => {
        try {
            const categoria = datosApp.categorias[indexCategoria];
            const response = await fetch(`https://jlorenzo.ddns.net/carta_restaurante/productos/${categoria.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario_id: "0912",
                    nombre: nuevoProducto.nombreProducto,
                    precio: nuevoProducto.precioProducto,
                    orden: categoria.productos.length
                })
            });
            const result = await response.json();

            // const datosActuales = datosApp;
            const categorias = datosApp.categorias.map((categoria, index) => {
                if (index === indexCategoria) {
                    return {
                        ...categoria,
                        productos: [...categoria.productos, {
                            id: result.producto_id,
                            nombreProducto: nuevoProducto.nombreProducto,
                            precioProducto: nuevoProducto.precioProducto
                        }]
                    };
                }
                return categoria;
            });
            setDatosApp({...datosApp, categorias});
            mostrarAviso('Producto creado correctamente', 'success');
        } catch (error) {
            mostrarAviso('Error al crear el producto', 'error');
            console.error('Error al crear producto:', error);
        }
    };

    const EliminarProducto = async (indexCategoria, indexProducto) => {
        try {
            const categoria = datosApp.categorias[indexCategoria];
            const producto = categoria.productos[indexProducto];

            const response = await fetch(`https://jlorenzo.ddns.net/carta_restaurante/productos/${producto.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario_id: "0912"
                })
            });

            const result = await response.json();

            if (result.status === 'success') {
                const categorias = datosApp.categorias.map((categoria, index) => {
                    if (index === indexCategoria) {
                        return {
                            ...categoria,
                            productos: categoria.productos.filter((prod, i) => i !== indexProducto)
                        };
                    }
                    return categoria;
                });
                setDatosApp({...datosApp, categorias});
                mostrarAviso('Producto eliminado correctamente', 'success');
            }
        } catch (error) {
            mostrarAviso('Error al eliminar el producto', 'error');
            console.error('Error al eliminar producto:', error);
        }
    };

    const EditarProducto = async (indexCategoria, indexProducto, productoEditado) => {
        try {
            const categoria = datosApp.categorias[indexCategoria];
            const producto = categoria.productos[indexProducto];

            const response = await fetch(`https://jlorenzo.ddns.net/carta_restaurante/productos/${producto.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario_id: "0912",
                    nombre: productoEditado.nombreProducto,
                    precio: productoEditado.precioProducto
                })
            });

            const result = await response.json();

            if (result.status === 'success') {
                const categorias = datosApp.categorias.map((categoria, index) => {
                    if (index === indexCategoria) {
                        return {
                            ...categoria,
                            productos: categoria.productos.map((prod, index2) => {
                                if (index2 === indexProducto) {
                                    return {
                                        ...prod,
                                        ...productoEditado
                                    };
                                }
                                return prod;
                            })
                        };
                    }
                    return categoria;
                });
                setDatosApp({...datosApp, categorias});
                mostrarAviso('Producto editado correctamente', 'success');
            }
        } catch (error) {
            mostrarAviso('Error al editar el producto', 'error');
            console.error('Error al editar producto:', error);
        }
    };

    return (
        <>
            {aviso && (
                <Avisos
                    mensaje={aviso.mensaje}
                    tipo={aviso.tipo}
                    onCerrar={cerrarAviso}
                />
            )}
            <Contenedor
                datosApp={datosApp}
                onCreaCategoria={CrearCategoria}
                onEditarCategoria={EditarCategoria}
                onEliminarCategoria={EliminarCategoria}
                onCreaProducto={CrearProducto}
                onEditarProducto={EditarProducto}
                onEliminarProducto={EliminarProducto}
            />
        </>
    );
}

export default App
