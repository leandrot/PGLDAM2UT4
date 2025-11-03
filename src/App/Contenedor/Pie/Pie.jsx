import './Pie.css'
function Pie({ datosApp }) {

    return (
        <footer>
            <hr />
            <a href={ datosApp.datosPie.sitioWeb } target="_blank">Visit our website</a>
            <address>{ datosApp.datosPie.direccion }</address>
        </footer>
    );
}
export default Pie;