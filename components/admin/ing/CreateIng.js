import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../Container';
import { validarNombre, validarSeleccion } from '../../Validaciones'; // Importar las funciones de validación
import Alert from '../../Alert'; // Importar el componente Alert
import { Link } from 'react-router-dom';

const ING_URI = 'http://localhost:8000/ing/';
const TIPOS_URI = 'http://localhost:8000/tipo/';

const CreateIng = () => {
    const [nombre, setNombre] = useState('');
    const [idTipo, setIdTipo] = useState('');
    const [tipos, setTipos] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Fetch tipos on mount
    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const response = await axios.get(TIPOS_URI);
                setTipos(response.data);
            } catch (error) {
                console.error('Error fetching tipos:', error);
            }
        };
        fetchTipos();
    }, []);

    // Handle form submission
    const store = async (e) => {
        e.preventDefault();
        const nombreError = validarNombre(nombre);
        const tipoError = validarSeleccion(idTipo);

        if (nombreError || tipoError) {
            setErrors({ nombre: nombreError, tipo: tipoError });
            return;
        }

        try {
            const ing = {
                nombre,
                idTipo
            };
            await axios.post(ING_URI, ing);
            navigate('/admin/ing');
        } catch (error) {
            console.error('Error creating ingrediente:', error);
            setErrors({ ...errors, submit: error.response?.data?.message || 'Error al crear el ingrediente' });
        }
    };

    return (
        <Container>
            <div align='center'>
                <h1>Crear Ingrediente</h1>
                <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <br />
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                        {errors.nombre && <Alert message={errors.nombre} type="danger" />}
                        <br />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Tipo</label>
                        <br />
                        <select
                            value={idTipo}
                            onChange={(e) => setIdTipo(e.target.value)}
                            className='form-control'
                        >
                            <option value="">Seleccione un tipo</option>
                            {tipos.map(tipo => (
                                <option key={tipo.idTipo} value={tipo.idTipo}>
                                    {tipo.nombreTipo}
                                </option>
                            ))}
                        </select>
                        {errors.tipo && <Alert message={errors.tipo} type="danger" />}
                        <br />
                    </div>
                    {errors.submit && <Alert message={errors.submit} type="danger" />}
                    <button type="submit">Enviar</button>
                </form>
                <br />
                <Link to="/admin/ing" className='btn btn-secondary mt-2'>Regresar</Link>
            </div>
        </Container>
    );
}

export default CreateIng;
