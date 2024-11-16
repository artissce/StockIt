import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Container from '../../Container';
import { Link } from 'react-router-dom';
import { validarNombre, validarCorreo, validarContrasena } from '../../Validaciones';
import Alert from '../../Alert';

const URI = 'http://localhost:8000/usuarios/'
const URI_ROLES = 'http://localhost:8000/roles/';

const EditUser = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { idUser } = useParams();

    useEffect(() => {
        getUserById();
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get(URI_ROLES);
            setRoles(response.data);
        } catch (err) {
            console.error('Error al obtener los roles:', err);
            setErrors({ ...errors, roles: 'Error al obtener los roles' });
        }
    };

    const getUserById = async () => {
        try {
            const res = await axios.get(URI + idUser);
            setNombre(res.data.nombre);
            setCorreo(res.data.correo);
            setContrasena(res.data.contrasena);
            setSelectedRole(res.data.idRol);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            setErrors({ ...errors, usuario: 'Error al obtener el usuario' });
        }
    };

    const update = async (e) => {
        e.preventDefault();
        const nombreError = validarNombre(nombre);
        const correoError = validarCorreo(correo);
        const contrasenaError = validarContrasena(contrasena);
        
        if (nombreError || correoError || contrasenaError) {
            setErrors({ nombre: nombreError, correo: correoError, contrasena: contrasenaError });
            return;
        }

        try {
            await axios.put(URI + idUser, { nombre, correo, contrasena, idRol: selectedRole });
            navigate('/admin/usuarios');
        } catch (error) {
            setErrors({ ...errors, submit: error.response?.data?.message || 'Error al actualizar el usuario' });
        }
    };

    return (
        <Container>
            <h1>Editar usuario</h1>
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre del Usuario</label>
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
                    <label className='form-label'>Contrasena</label>
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
                <button type="submit">Actualizar</button>
            </form>
            <Link to="/admin/usuarios" className='btn btn-secondary mt-2'>Regresar al Menú Admin</Link>
        </Container>
    );
};

export default EditUser;
