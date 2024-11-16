import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Container from '../../Container';

const URI = 'http://localhost:8000/usuarios/'

const ShowUser = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const res = await axios.get(URI)
        setUsers(res.data)
    }

    const deleteUser = async (idUsuario) => {
        await axios.delete(`${URI}${idUsuario}`)
        getUsers()
    }

    return (
        <Container>
            <Link to="/admin/usuarios/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
            <div className="table-responsive">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '20%' }}>idUsuario</th>
                            <th scope="col" style={{ width: '15%' }}>Nombre del User</th>
                            <th scope="col" style={{ width: '15%' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.idUsuario}>
                                <td>{user.idUsuario} </td>
                                <td>{user.nombre} </td>
                                <td>
                                    <Link to={`/admin/usuarios/edit/${user.idUsuario}`} className='btn btn-info'> <i className="fas fa-edit"></i></Link>
                                    <button onClick={() => deleteUser(user.idUsuario)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <Link to="/admin" className='btn btn-secondary mt-2'>Regresar al Menú Admin</Link>
            </div>
            
        </Container>
    )
}

export default ShowUser;
