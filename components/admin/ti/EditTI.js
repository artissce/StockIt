import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from '../../Container';
import { validarNombre } from '../../Validaciones'; // Asegúrate de importar la función de validación
import Alert from '../../Alert'; // Asegúrate de importar el componente Alert

const URI = 'http://localhost:8000/tipo/';

const EditTI = () => {
    const [nombreTipo, setNombreTipo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { idTipo } = useParams();

    //guardar
    const update = async (e) => {
        e.preventDefault();
        const nombreError = validarNombre(nombreTipo);
        if (nombreError) {
            setError(nombreError);
            return;
        }

        try {
            await axios.put(URI + idTipo, { nombreTipo });
            navigate('/admin/tipo'); // Navegar de regreso al listado después de la actualización
        } catch (error) {
            console.error("Error al actualizar el tipo:", error);
            setError(error.response?.data?.message || 'Error al actualizar el tipo');
        }
    };

    useEffect(() => {
        getTipoById();
    }, []);

    const getTipoById = async () => {
        try {
            const res = await axios.get(URI + idTipo);
            setNombreTipo(res.data.nombreTipo);
        } catch (error) {
            console.error('Error al obtener el tipo:', error);
            setError('Error al obtener el tipo');
        }
    };

    return (
        <Container>
            <div align='center'>
                <h1>Editar tipo de ingrediente</h1>
                <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre del tipo</label>
                        <br />
                        <input 
                            value={nombreTipo} onChange={(e) => setNombreTipo(e.target.value)} 
                            type="text" className='form-control' />
                        {error && <Alert message={error} type="danger" />}
                        <br />
                    </div>
                    <button type="submit">Actualizar</button>
                </form>
                <br />
                <Link to="/admin/tipo" className='btn btn-secondary mt-2'>Regresar al Menú Admin</Link>
            </div>
        </Container>
    );
};

export default EditTI;
