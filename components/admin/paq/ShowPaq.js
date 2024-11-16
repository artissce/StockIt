import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../Container';
import '../css//ShowPaq.css'; // Asegúrate de tener un archivo CSS para los estilos específicos

const URI = 'http://localhost:8000/paquete/'; // Asegúrate de que esta URI coincida con tu endpoint del backend

const ShowPaq = () => {
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
                <div className='header'>
                    <Link to="/admin/paquete/create" className='btn btn-primary'>
                        <i className="fas fa-plus"></i>
                    </Link>
                </div>
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
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paquetes.map((paquete) => (
                                <tr key={paquete.idPaquete}>
                                    <td>{paquete.idPaquete}</td>
                                    <td>{paquete.nombre}</td>
                                    <td>{paquete.precio}</td>
                                    <td className="description-cell">{paquete.descripcion}</td>
                                    <td>{paquete.cantidadProducto}</td>
                                    <td>
                                        {paquete.assignedPro.map((producto) => (
                                            <div key={producto.idProducto}>
                                                {producto.nombre} ({producto.categoria})
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <Link to={`/admin/paquete/edit/${paquete.idPaquete}`} className='btn btn-info'>
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => deletePaquete(paquete.idPaquete)} className='btn btn-danger'>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/admin" className='btn btn-secondary mt-2'>Regresar al Menú Admin</Link>
            </div>
        </Container>
    );
};

export default ShowPaq;
