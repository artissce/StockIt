import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../Container';
import { validarNombre } from '../../Validaciones'; // Importa la función de validación
import Alert from '../../Alert'; // Importa el componente Alert
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/tipo/'

const CreateTI = () => {
    const [nombreTipo, setNombreTipo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //guardar
    const store = async (e) => {
        e.preventDefault();
        const nombreError = validarNombre(nombreTipo);
        if (nombreError) {
            setError(nombreError);
            return;
        }

        try {
            const tipo = {
                nombreTipo
            };
            await axios.post(URI, tipo);
            navigate('/admin/tipo');
        } catch (error) {
            console.error('Error al crear el tipo:', error);
            setError(error.response?.data?.message || 'Error al crear el tipo');
        }
    }

    return (
        <Container>
            <div align='center'>
                <h1>Crear tipo</h1>
                <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <br />
                        <input 
                            value={nombreTipo} onChange={(e) => setNombreTipo(e.target.value)} 
                            type="text" className='form-control' />
                        {error && <Alert message={error} type="danger" />}
                        <br />
                    </div>
                    <button type="submit">Enviar</button>
                </form>
                <br />
                <Link to="/admin/tipo" className='btn btn-secondary mt-2'>Regresar</Link>
            </div>
        </Container>
    );
}

export default CreateTI;
