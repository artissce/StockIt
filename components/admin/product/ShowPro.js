import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../Container';

const URI = 'http://localhost:8000/producto/';

const ShowPro = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getPro();
    }, []);

    const getPro = async () => {
        try {
            const res = await axios.get(URI);
            setProductos(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deletePro = async (idProducto) => {
        try {
            await axios.delete(`${URI}${idProducto}`);
            getPro();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Container>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-12'>
                        <Link to="/admin/producto/create" className='btn btn-primary mt-2 mb-2'>
                            <i className="fas fa-plus"></i> 
                        </Link>
                        <div className="table-responsive">
                            <table className='table table-striped table-hover'>
                                <thead className="thead-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Categoría</th>
                                        <th>Descripción</th>
                                        <th>Ingredientes</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto) => (
                                        <tr key={producto.idProducto}>
                                            <td>{producto.idProducto}</td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.precio}</td>
                                            <td>{producto.categoria}</td>
                                            <td>{producto.descripcion}</td>
                                            <td>
                                                {producto.assignedIng && Array.isArray(producto.assignedIng) ? (
                                                    <ul className="list-unstyled">
                                                        {producto.assignedIng.map((ingrediente) => (
                                                            <li key={ingrediente.idIng}>{ingrediente.nombre}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span>No hay ingredientes</span>
                                                )}
                                            </td>
                                            <td>
                                                <Link to={`/admin/producto/edit/${producto.idProducto}`} className='btn btn-info btn-sm mr-1'>
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button onClick={() => deletePro(producto.idProducto)} className='btn btn-danger btn-sm'>
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
                </div>
            </div>
        </Container>
    );
};

export default ShowPro;
