import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Link } from 'react-router-dom';
import Container from '../../Container';
const URI = 'http://localhost:8000/roles/'


const EditRol = ()=>{
    const [nombreRol,setNombreRol]=useState('')
    const navigate = useNavigate()
    const {idRol}= useParams()
    //guardar
    const update = async (e) => {
        e.preventDefault();
        const url = URI + idRol; // Agrega esta línea para imprimir la URL
        console.log("URL de la solicitud PUT:", url);
        try {
            await axios.put(URI+ idRol, { nombreRol:nombreRol });
            navigate('/admin/roles'); // Navegar de regreso al listado después de la actualización
        } catch (error) {
            console.error("Error al actualizar el rol:", error);
        }
    };

    useEffect(()=>{
        getRolById()
    },[])

    const getRolById = async()=>{
        const res=await axios.get(URI+idRol)
        setNombreRol(res.data.rol)
    }

    return(
        <Container>
        <div>
            <h1>Edit Rol</h1>
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label className='form=label'>Nombre del rol</label>
                    <input 
                        value={nombreRol} onChange={(e)=>setNombreRol(e.target.value)} 
                        type="text" className='form-control'/>
                    
                </div>
                    
                <button type="submit" >Update</button>
                <br></br>
            <Link to="/admin/roles" className='btn btn-secondary mt-2'>Regresar</Link>
            </form>
        </div>
        </Container>
    )
}

export default EditRol 