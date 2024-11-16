import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../Container';
import { validarNombre, validarCorreo, validarContrasena } from '../../Validaciones';
import Alert from '../../Alert';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/usuarios/'
const URI_ROLES = 'http://localhost:8000/roles/';

const CreateUser = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(URI_ROLES);
                setRoles(response.data);
            } catch (err) {
                console.error('Error al obtener los roles:', err);
                setErrors({ ...errors, roles: 'Error al obtener los roles' });
            }
        };
        fetchRoles();
    }, []);

    const store = async (e) => {
        e.preventDefault();
        const nombreError = validarNombre(nombre);
        const correoError = validarCorreo(correo);
        const contrasenaError = validarContrasena(contrasena);

        if (nombreError || correoError || contrasenaError) {
            setErrors({ nombre: nombreError, correo: correoError, contrasena: contrasenaError });
            return;
        }

        try {
            const usuario = {
                nombre,
                correo,
                contrasena,
                idRol: selectedRole
            };
            await axios.post(URI, usuario);
            navigate('/admin/usuarios');
        } catch (error) {
            setErrors({ ...errors, submit: error.response?.data?.message || 'Error al crear el usuario' });
        }
    };

    return (
        <Container>
            <h1>Crear Usuario</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <br />
                    <input
                        value={nombre} onChange={(e) => setNombre(e.target.value)}
                        type="text" className='form-control' />
                    {errors.nombre && <Alert message={errors.nombre} type="danger" />}
                    <br />
                    <label className='form-label'>Correo</label>
                    <br />
                    <input
                        value={correo} onChange={(e) => setCorreo(e.target.value)}
                        type="text" className='form-control' />
                    {errors.correo && <Alert message={errors.correo} type="danger" />}
                    <br />
                    <label className='form-label'>Contraseña</label>
                    <br />
                    <input
                        value={contrasena} onChange={(e) => setContrasena(e.target.value)}
                        type="password" className='form-control' />
                    {errors.contrasena && <Alert message={errors.contrasena} type="danger" />}
                    <br />
                    <label className='form-label'>Seleccionar rol:</label>
                    <br></br>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className='form-control'
                    >
                        <option value="">Seleccione un rol</option>
                        {roles.map((role) => (
                            <option key={role.idRol} value={role.idRol}>{role.nombreRol}</option>
                        ))}
                    </select>
                    {errors.roles && <Alert message={errors.roles} type="danger" />}
                </div>
                {errors.submit && <Alert message={errors.submit} type="danger" />}
                <button type="submit">Enviar</button>
            </form>
            <br></br>
            <Link to="/admin/usuarios" className='btn btn-secondary mt-2'>Regresar al Menú Admin</Link>
        </Container>
    );
};

export default CreateUser;
