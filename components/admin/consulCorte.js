import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';

const ConsulCorte = () => {
    const [fecha, setFecha] = useState('');

    const handleFechaChange = (e) => {
        setFecha(e.target.value);
    };

    return (
        <Container>
            <div className='admin-menu-container'>
                <h1>Consultar Cortes</h1>
                <form>
                    <label>
                        Selecciona la Fecha:
                        <br/>
                        <input
                            type="date"
                            value={fecha}
                            onChange={handleFechaChange}
                            required
                        />
                    </label>
                    <br/>
                    <br/>
                    <Link to={`/admin/consulta/${fecha}`} className="btn btn-outline-primary btn-block">
                        Ver Total de Ventas
                    </Link>
                    <div className="buttons-container">
                        <Link to="/admin" className="btn btn-secondary mt-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default ConsulCorte;
