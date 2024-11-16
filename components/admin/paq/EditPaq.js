import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from '../../Container';
const URI_PAQ = 'http://localhost:8000/paquete/';
const URI_PROD = 'http://localhost:8000/producto/';

const EditPaq = () => {
    const { idPaquete } = useParams();
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [productos, setProductos] = useState([]);
    const [productosList, setProductosList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPaqueteById();
        getProductosList();
    }, []);

    const getPaqueteById = async () => {
        try {
            console.log(`Fetching paquete with id: ${idPaquete}`);
            const res = await axios.get(`${URI_PAQ}${idPaquete}`);
            const paquete = res.data;
            console.log("Paquete obtenido:", paquete);
            setNombre(paquete.nombre);
            setPrecio(paquete.precio);
            setDescripcion(paquete.descripcion);
            const mappedProductos = paquete.assignedPro.map(prod => ({
                idProducto: prod.idProducto,
                cantidad: prod.producto_paquete.cantidad
            }));
            setProductos(mappedProductos);
        } catch (error) {
            console.error("Error al obtener el paquete:", error);
        }
    };

    const getProductosList = async () => {
        try {
            const res = await axios.get(URI_PROD);
            setProductosList(res.data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    const addProductoField = () => {
        setProductos([...productos, { idProducto: '', cantidad: 1 }]);
    };

    const removeProductoField = (index) => {
        const newProductos = [...productos];
        newProductos.splice(index, 1);
        setProductos(newProductos);
    };

    const handleProductoChange = (index, key, value) => {
        const newProductos = [...productos];
        if (key === 'cantidad') {
            const cantidad = parseInt(value, 10);
            newProductos[index] = { ...newProductos[index], [key]: isNaN(cantidad) ? 0 : cantidad };
        } else {
            newProductos[index] = { ...newProductos[index], [key]: value };
        }
        setProductos(newProductos);
    };

    const update = async (e) => {
        e.preventDefault();
        try {
            console.log(`Updating paquete with id: ${idPaquete}`);
            console.log({
                nombre,
                precio,
                descripcion,
                productos,
            });
            const response = await axios.put(`${URI_PAQ}${idPaquete}`, {
                nombre,
                precio: parseFloat(precio),
                descripcion,
                productos,
            });
            console.log('Response from server:', response);
            navigate('/admin/paquete');
        } catch (error) {
            console.error("Error al actualizar el paquete:", error);
        }
    };

    return (
        <Container>
        <div align='center'>
            <h1>Editar Paquete</h1>
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Precio</label>
                    <input
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        type='number'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className='form-control'
                    ></textarea>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Cantidad de Productos</label>
                    <br/>
                    <button type='button' onClick={addProductoField} className='btn btn-success ml-2'>+</button>
                    <br/>
                    <br/>
                    {productos.map((producto, index) => (
                        <div key={index} className='input-group mb-3'>
                            <select
                                value={producto.idProducto}
                                onChange={(e) => handleProductoChange(index, 'idProducto', e.target.value)}
                                className='form-control'
                            >
                                <option value='' disabled>Selecciona un producto</option>
                                {productosList.map(prod => (
                                    <option key={prod.idProducto} value={prod.idProducto}>{prod.nombre}</option>
                                ))}
                            </select>
                            <input
                                type='number'
                                value={producto.cantidad}
                                onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
                                className='form-control'
                            />
                            <button type='button' onClick={() => removeProductoField(index)} className='btn btn-danger'>-</button>
                        </div>
                    ))}
                </div>
                <button type='submit' >Actualizar</button>
            </form>
            <br></br>
                    <Link to="/admin/paquete" className='btn btn-secondary mt-2'>Regresar </Link>
        </div>
        </Container>
    );
};

export default EditPaq;
