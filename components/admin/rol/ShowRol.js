import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import Container from '../../Container';
const URI = 'http://localhost:8000/roles/'

const ShowRol = () => {
    const [rol,setRol]=useState([])
    useEffect(()=>{//utilizar efecto, referente a que react no controla
        getRol()
    },[])
    //procedimiento para mostrar todos los pedidos
    const getRol = async () =>{
        const res = await axios.get(URI)
        setRol(res.data)
    }

    //proc para eliminar un pedido
    const deleteRol = async(idRol) => {
        await axios.delete(`${URI}${idRol}`)
        getRol()
    }
    //proc crear
    return(
        <Container>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-10'>
                    <Link to="/admin/roles/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
                    <div className="table-responsive">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '20%' }}>idRol</th>
                                    <th scope="col" style={{ width: '35%' }}>Nombre del rol</th>
                                    <th scope="col" style={{ width: '30%' }}>ACC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rol.map ((rol)=>(
                                    <tr key={rol.idRol}>
                                        <td>{rol.idRol} </td>
                                        <td>{rol.nombreRol} </td>
                                        <td>
                                            <Link to={`/admin/roles/edit/${rol.idRol}`} className='btn btn-info'> <i className="fas fa-edit"></i></Link>
                                            <button onClick={()=>deleteRol(rol.idRol)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <Link to="/admin" className='btn btn-secondary mt-2'>Regresar al Menú Admin</Link>
                </div>
                
            </div>

        </Container>
    )
}
export default ShowRol