import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../Container';
import { Link } from 'react-router-dom';
import { validarNombre, validarSeleccion } from '../../Validaciones'; // Importar las funciones de validación
import Alert from '../../Alert'; // Importar el componente Alert

const ING_URI = 'http://localhost:8000/ing/';
const TIPOS_URI = 'http://localhost:8000/tipo/';

const EditIng = () => {
    const [nombre, setNombre] = useState('');
    const [idTipo, setIdTipo] = useState('');
    const [tipos, setTipos] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { idIng } = useParams();

    // Fetch tipos and current ingredient data on mount
    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const response = await axios.get(TIPOS_URI);
                setTipos(response.data);
            } catch (error) {
                console.error('Error fetching tipos:', error);
                setErrors({ ...errors, tipos: 'Error al obtener los tipos' });
            }
        };

        const getIngById = async () => {
            try {
                const res = await axios.get(ING_URI + idIng);
                setNombre(res.data.nombre);
                setIdTipo(res.data.idTipo);
            } catch (error) {
                console.error('Error fetching ingrediente:', error);
                setErrors({ ...errors, ingrediente: 'Error al obtener el ingrediente' });
            }
        };

        fetchTipos();
        getIngById();
    }, [idIng]);

    // Handle form submission
    const update = async (e) => {
        e.preventDefault();
        const nombreError = validarNombre(nombre);
        const tipoError = validarSeleccion(idTipo);

        if (nombreError || tipoError) {
            setErrors({ nombre: nombreError, tipo: tipoError });
            return;
        }

        try {
            await axios.put(ING_URI + idIng, { nombre, idTipo });
            navigate('/admin/ing');
        } catch (error) {
            console.error('Error updating ingrediente:', error);
            setErrors({ ...errors, submit: error.response?.data?.message || 'Error al actualizar el ingrediente' });
        }
    };

    return (
        <Container>
            <div align='center'>
                <h1>Editar Ingrediente</h1>
                <form onSubmit={update}>
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
                    <button type="submit">Actualizar</button>
                </form>
                <br />
                <Link to="/admin/ing" className='btn btn-secondary mt-2'>Regresar</Link>
            </div>
        </Container>
    );
}

export default EditIng;
