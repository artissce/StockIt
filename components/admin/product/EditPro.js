import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from '../../Container';

const URI = 'http://localhost:8000/producto/';
const URI_ING = 'http://localhost:8000/ing/';

const EditPro = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantIng, setCantIng] = useState(1);
    const [ingredientes, setIngredientes] = useState(['']);
    const [ingredientesList, setIngredientesList] = useState([]);
    const navigate = useNavigate();
    const { idProducto } = useParams();

    useEffect(() => {
        getProById();
        getIngredientesList();
    }, []);

    const getProById = async () => {
        try {
            const res = await axios.get(URI + idProducto);
            const pro = res.data;
            console.log("Producto obtenido:", pro); // Verifica los datos del producto
            setNombre(pro.nombre);
            setPrecio(pro.precio);
            setCategoria(pro.categoria);
            setDescripcion(pro.descripcion);
            setCantIng(pro.assignedIng.length);
            setIngredientes(pro.assignedIng.map(ing => ing.idIng));
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const getIngredientesList = async () => {
        try {
            const res = await axios.get(URI_ING);
            setIngredientesList(res.data);
        } catch (error) {
            console.error("Error fetching ingredientes:", error);
        }
    };

    const handleIngredientChange = (index, value) => {
        const newIngredientes = [...ingredientes];
        newIngredientes[index] = value;
        setIngredientes(newIngredientes);
    };

    const addIngredientField = () => {
        setCantIng(cantIng + 1);
        setIngredientes([...ingredientes, '']);
    };

    const removeIngredientField = (index) => {
        const newIngredientes = [...ingredientes];
        newIngredientes.splice(index, 1);
        setIngredientes(newIngredientes);
        setCantIng(cantIng - 1);
    };

    const updatePro = async (e) => {
        e.preventDefault();
        try {
            await axios.put(URI + idProducto, {
                nombre,
                precio,
                categoria,
                descripcion,
                cantIng,
                ingredientes,
            });
            navigate('/admin/producto');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Container>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-lg-8'>
                        <h1 className='text-center'>Editar Producto</h1>
                        <form onSubmit={updatePro}>
                            <div className='form-group'>
                                <label className='form-label'>Nombre del Producto</label>
                                <input
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    type="text"
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Precio</label>
                                <input
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    type="number"
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Categoría</label>
                                <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    className='form-control'
                                >
                                    <option value='' disabled>Selecciona una categoría</option>
                                    <option value="Postre">Postre</option>
                                    <option value="Bebida Fría">Bebida Fría</option>
                                    <option value="Bebida Caliente">Bebida Caliente</option>
                                    <option value="Platillo">Platillo</option>
                                    <option value="Desayuno">Desayuno</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Descripción</label>
                                <textarea
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    className='form-control'
                                ></textarea>
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Ingredientes</label>
                                <button type='button' onClick={addIngredientField} className='btn btn-success btn-sm ml-2 mb-2'>+</button>
                                {Array.from({ length: cantIng }).map((_, index) => (
                                    <div key={index} className='input-group mb-3'>
                                        <select
                                            value={ingredientes[index] || ''}
                                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                                            className='form-control'
                                        >
                                            <option value='' disabled>Selecciona un ingrediente</option>
                                            {ingredientesList.map(ing => (
                                                <option key={ing.idIng} value={ing.idIng}>{ing.nombre}</option>
                                            ))}
                                        </select>
                                        <div className="input-group-append">
                                            <button type='button' onClick={() => removeIngredientField(index)} className='btn btn-danger'>-</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button type="submit" >Actualizar</button>
                        </form>
                        <Link to="/admin/producto" className='btn btn-secondary btn-block mt-3'>Regresar</Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default EditPro;
