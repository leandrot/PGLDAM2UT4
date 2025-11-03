function Cabecera({ datosApp }) {
    return (
        <header>
            <h1>{datosApp.nombreCafeteria}</h1>
            <p>Est. {datosApp.anoInauguracion}</p>
            <hr/>
        </header>
    );
}

export default Cabecera;