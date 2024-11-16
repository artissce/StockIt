import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';

const URI = 'http://localhost:8000/paquete/'; // Asegúrate de que esta URI coincida con tu endpoint del backend

const ShowMenu = () => {
    const [paquetes, setPaquetes] = useState([]);

    useEffect(() => {
        getPaquetes();
    }, []);

    // Procedimiento para obtener todos los paquetes
    const getPaquetes = async () => {
        try {
            const res = await axios.get(URI);
            setPaquetes(res.data);
        } catch (error) {
            console.error('Error fetching paquetes:', error);
        }
    };

    // Procedimiento para eliminar un paquete
    const deletePaquete = async (idPaquete) => {
        try {
            await axios.delete(`${URI}${idPaquete}`);
            // Actualiza la lista de paquetes localmente
            setPaquetes(paquetes.filter(paquete => paquete.idPaquete !== idPaquete));
        } catch (error) {
            console.error('Error deleting paquete:', error);
        }
    };

    return (
        <Container>
            <div className='show-paq-container'>
                <h1>Menú</h1>
                <div className="table-responsive">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Productos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paquetes.map((paquete) => (
                                <tr key={paquete.idPaquete}>
                                    <td>{paquete.idPaquete}</td>
                                    <td>{paquete.nombre}</td>
                                    <td>{paquete.precio}</td>
                                    <td style={{ width: '300px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{paquete.descripcion}</td>
                                    <td>{paquete.cantidadProducto}</td>
                                    <td>
                                        {paquete.assignedPro.map((producto) => (
                                            <div key={producto.idProducto}>
                                                {producto.nombre} ({producto.categoria})
                                            </div>
                                        ))}
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/home" className='btn btn-secondary mt-2'>Regresar </Link>
            </div>
        </Container>
    );
};

export default ShowMenu;
