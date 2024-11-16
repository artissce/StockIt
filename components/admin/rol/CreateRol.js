import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../Container';
import { Link } from 'react-router-dom';
import { validarNombre } from '../../Validaciones.jsx';
import Alert from '../../Alert.jsx'; // Importa el componente Alert
const URI = 'http://localhost:8000/roles/'



const CreateUser = ()=>{
    const [nombreRol,setNombreRol]=useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate()

    //guardar
    const store = async (e) => {
        e.preventDefault();
        const error = validarNombre(nombreRol);
        if (error) {
            setError(error);
            return;
        }

        try {
            await axios.post(URI, { nombreRol });
            navigate('/admin/roles');
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return(
        <Container>
        <div>
            <h1>Crear rol</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form=label'>Nombre del rol:</label>
                    <br></br>
                    <input 
                        value={nombreRol} onChange={(e)=>setNombreRol(e.target.value)} 
                        type="text" className='form-contUser form-control'/>
                </div>
                {error && <Alert message={error} type="danger" />}   
                <button type="submit" >Enviar</button>
                
            </form>
            <br></br>
            <Link to="/admin/roles" className='btn btn-secondary mt-2'>Regresar </Link>
        </div>
        </Container>
    )
}

export default CreateUser 