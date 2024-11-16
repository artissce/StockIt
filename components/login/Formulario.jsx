import './Formulario.css'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Container from '../Container';
export function Formulario({ setUsuario }) {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user === "" || pwd === "") {
            setError(true);
            setErrorMsg("Todos los campos son obligatorios");
            return;
        }
        setError(false); // Regresar sin el cartel
        setErrorMsg(""); // Limpiar el mensaje de error

        try {
            const response = await axios.post('http://localhost:8000/usuarios/login', { correo: user, contrasena: pwd });
            if (response.status === 200) {
                // Autenticación exitosa, redirigir al usuario a la página correspondiente
                const usuario = response.data.usuario;
                if (response.data.usuario.idRol === 1) {
                    navigate('/admin');
                } else if (response.data.usuario.idRol === 2) {
                navigate('/home');
                }
            } else {
                setError(true); // Mostrar mensaje de error si la autenticación falla
                setErrorMsg("Error en la autenticación");
            }
        } catch (error) {
            console.error("Error de autenticación:", error);
            setError(true); // Mostrar mensaje de error si hay un problema con la solicitud
            setErrorMsg("Error de autenticación");
        }
    };

    return (
        <Container>
        <section>
            <div className="alert-container">
                {error && (
                    <div className="alert-container">
                        <Alert variant="danger" onClose={() => setError(false)} dismissible>
                            {errorMsg}
                        </Alert>
                    </div>
                )}
            </div>
            <div className="form-container">
                <form className='formulario' onSubmit={handleSubmit}>
                    <img src={"../../logo.svg"} alt="Descripción de la imagen" style={{ width: '100px', height: '100px' }} />
                    <h1>Login</h1>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="text">Correo</label>
                        <br />
                        <input type="text" className="form-control" value={user} onChange={e => setUser(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Contraseña</label>
                        <br />
                        <input type="password" className="form-control" value={pwd} onChange={e => setPwd(e.target.value)} />
                    </div>
                    <button type="submit" >Iniciar</button>
                </form>
            </div>
        </section>
        </Container>
    );
}