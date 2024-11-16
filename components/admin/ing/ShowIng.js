import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../Container';

const ING_URI = 'http://localhost:8000/ing/';
const TIPOS_URI = 'http://localhost:8000/tipo/';

const ShowIng = () => {
    const [ingredientes, setIngredientes] = useState([]);
    const [tipos, setTipos] = useState({});

    // Fetch ingredientes and tipos on mount
    useEffect(() => {
        getIngredientes();
        getTipos();
    }, []);

    const getIngredientes = async () => {
        try {
            const res = await axios.get(ING_URI);
            setIngredientes(res.data);
        } catch (error) {
            console.error('Error fetching ingredientes:', error);
        }
    };

    const getTipos = async () => {
        try {
            const res = await axios.get(TIPOS_URI);
            const tiposMap = res.data.reduce((acc, tipo) => {
                acc[tipo.idTipo] = tipo.nombreTipo;
                return acc;
            }, {});
            setTipos(tiposMap);
        } catch (error) {
            console.error('Error fetching tipos:', error);
        }
    };

    const deleteIngrediente = async (idIng) => {
        try {
            await axios.delete(`${ING_URI}${idIng}`);
            getIngredientes();
        } catch (error) {
            console.error('Error deleting ingrediente:', error);
        }
    };

    return (
        <Container>
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                <div className='row justify-content-center w-100'>
                    <div className='col-12'>
                        <Link to="/admin/ing/create" className='btn btn-primary mt-2 mb-2'>
                            <i className="fas fa-plus"></i>
                        </Link>
                        <div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingredientes.map(ingrediente => (
                                        <tr key={ingrediente.idIng}>
                                            <td>{ingrediente.idIng}</td>
                                            <td>{ingrediente.nombre}</td>
                                            <td>{tipos[ingrediente.idTipo] || 'Desconocido'}</td>
                                            <td>
                                                <Link to={`/admin/ing/edit/${ingrediente.idIng}`} className='btn btn-info'>
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button onClick={() => deleteIngrediente(ingrediente.idIng)} className='btn btn-danger'>
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <Link to="/admin" className='btn btn-secondary mt-2'>Regresar al Menú Admin</Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ShowIng;
