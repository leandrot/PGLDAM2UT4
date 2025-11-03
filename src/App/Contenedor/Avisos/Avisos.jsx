import { useEffect } from 'react';
import './Avisos.css';

const Avisos = ({ mensaje, tipo, onCerrar }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onCerrar();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onCerrar]);

    return (
        <div className={`aviso aviso-${tipo}`}>
            {mensaje}
        </div>
    );
};

export default Avisos;