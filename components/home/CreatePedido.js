import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../Container';
import { Link } from 'react-router-dom';

const URI_PEDIDOS = 'http://localhost:8000/pedidos/';
const URI_PAQUETES = 'http://localhost:8000/paquete/';
const URI_PRODUCTOS = 'http://localhost:8000/producto/';

const CreatePedido = () => {
    const [cliente, setCliente] = useState('');
    const [paquetes, setPaquetes] = useState([]);
    const [selectedPaquetes, setSelectedPaquetes] = useState([]);
    const [productos, setProductos] = useState({});
    const [ingredientesDisponibles, setIngredientesDisponibles] = useState({});
    const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getPaquetes();
    }, []);

    const getPaquetes = async () => {
        try {
            const res = await axios.get(URI_PAQUETES);
            setPaquetes(res.data);
        } catch (error) {
            console.error('Error fetching paquetes:', error);
        }
    };

    const addPaquete = () => {
        setSelectedPaquetes([...selectedPaquetes, '']);
    };

    const removePaquete = (index) => {
        const newSelectedPaquetes = [...selectedPaquetes];
        newSelectedPaquetes.splice(index, 1);
        setSelectedPaquetes(newSelectedPaquetes);

        const newProductos = { ...productos };
        delete newProductos[index];
        setProductos(newProductos);

        const newIngredientesDisponibles = { ...ingredientesDisponibles };
        delete newIngredientesDisponibles[index];
        setIngredientesDisponibles(newIngredientesDisponibles);

        const newIngredientesSeleccionados = { ...ingredientesSeleccionados };
        delete newIngredientesSeleccionados[index];
        setIngredientesSeleccionados(newIngredientesSeleccionados);
    };

    const handlePaqueteChange = async (e, index) => {
        const paqueteId = e.target.value;
        const newSelectedPaquetes = [...selectedPaquetes];
        newSelectedPaquetes[index] = paqueteId;
        setSelectedPaquetes(newSelectedPaquetes);

        if (paqueteId) {
            try {
                const res = await axios.get(`${URI_PAQUETES}${paqueteId}`);
                const paquete = res.data;
                const newProductos = { ...productos, [index]: paquete.assignedPro || [] };
                setProductos(newProductos);

                const newIngredientesDisponibles = { ...ingredientesDisponibles, [index]: {} };
                const newIngredientesSeleccionados = { ...ingredientesSeleccionados, [index]: {} };

                for (const producto of paquete.assignedPro) {
                    const resProd = await axios.get(`${URI_PRODUCTOS}${producto.idProducto}`);
                    const productoData = resProd.data;
                    newIngredientesDisponibles[index][producto.idProducto] = productoData.assignedIng.map(ing => ({
                        idIng: ing.idIng,
                        nombre: ing.nombre
                    }));
                    newIngredientesSeleccionados[index][producto.idProducto] = [];
                }
                setIngredientesDisponibles(newIngredientesDisponibles);
                setIngredientesSeleccionados(newIngredientesSeleccionados);
                console.log('Ingredientes disponibles:', newIngredientesDisponibles);
            } catch (error) {
                console.error('Error fetching paquete:', error);
            }
        }
    };

    const handleIngredienteAdd = (paqueteIndex, productoId) => {
        const selectedIngredientId = parseInt(document.getElementById(`select-${paqueteIndex}-${productoId}`).value);
        setIngredientesSeleccionados(prevState => {
            const newIngredientesSeleccionados = { ...prevState };
            if (!newIngredientesSeleccionados[paqueteIndex]) {
                newIngredientesSeleccionados[paqueteIndex] = {};
            }
            if (!newIngredientesSeleccionados[paqueteIndex][productoId]) {
                newIngredientesSeleccionados[paqueteIndex][productoId] = [];
            }

            const ingredientes = newIngredientesSeleccionados[paqueteIndex][productoId];
            if (!ingredientes.some(ing => ing.idIng === selectedIngredientId)) {
                const ingrediente = ingredientesDisponibles[paqueteIndex][productoId].find(ing => ing.idIng === selectedIngredientId);
                if (ingrediente) {
                    newIngredientesSeleccionados[paqueteIndex][productoId] = [...ingredientes, ingrediente];
                }
            }
            console.log('Ingredientes seleccionados:', newIngredientesSeleccionados);
            return newIngredientesSeleccionados;
        });
    };

    const handleIngredienteRemove = (paqueteIndex, productoId, ingredienteId) => {
        setIngredientesSeleccionados(prevState => {
            const newIngredientesSeleccionados = { ...prevState };
            if (newIngredientesSeleccionados[paqueteIndex] && newIngredientesSeleccionados[paqueteIndex][productoId]) {
                newIngredientesSeleccionados[paqueteIndex][productoId] = newIngredientesSeleccionados[paqueteIndex][productoId].filter(ing => ing.idIng !== ingredienteId);
            }
            console.log('Ingredientes seleccionados después de eliminar:', newIngredientesSeleccionados);
            return newIngredientesSeleccionados;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedIngredientesSeleccionados = Object.entries(ingredientesSeleccionados).flatMap(([paqueteIndex, paquete]) =>
                Object.entries(paquete).flatMap(([productoId, ingredientes]) =>
                    ingredientes.map(ing => ({
                        productoId: parseInt(productoId),
                        ingredienteId: ing.idIng
                    }))
                )
            );
    
            const pedidoData = {
                cliente,
                paquetes: selectedPaquetes,
                estado: 'En proceso',
                ingredientesSeleccionados: formattedIngredientesSeleccionados
            };
    
            console.log('Datos del pedido:', pedidoData);
    
            await axios.post(URI_PEDIDOS, pedidoData);
            navigate('/home/pedidos');
        } catch (error) {
            console.error('Error creating pedido:', error);
        }
    };
    

    return (
        <Container>
            <h1>Crear Pedido</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        required
                    />
                </div>
                <button type="button" className="btn btn-secondary mb-3" onClick={addPaquete}>Añadir Paquete</button>
                {selectedPaquetes.map((selectedPaquete, index) => (
                    <div key={index} className="mb-3">
                        <label className="form-label">Paquete</label>
                        <select
                            className="form-select mb-2"
                            value={selectedPaquete}
                            onChange={(e) => handlePaqueteChange(e, index)}
                            required
                        >
                            <option value="">Selecciona un paquete</option>
                            {paquetes.map(paquete => (
                                <option key={paquete.idPaquete} value={paquete.idPaquete}>
                                    {paquete.nombre}
                                </option>
                            ))}
                        </select>
                        {productos[index]?.length > 0 && productos[index].map(producto => (
                            <div key={producto.idProducto} className="mb-3">
                                <label className="form-label">{producto.nombre}</label>
                                <div className="d-flex">
                                    <select id={`select-${index}-${producto.idProducto}`} className="form-select">
                                        {ingredientesDisponibles[index] && ingredientesDisponibles[index][producto.idProducto]?.length > 0 ? (
                                            ingredientesDisponibles[index][producto.idProducto].map(ingrediente => (
                                                <option key={ingrediente.idIng} value={ingrediente.idIng}>
                                                    {ingrediente.nombre}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No hay ingredientes disponibles</option>
                                        )}
                                    </select>
                                    <button type="button" className="btn btn-primary ms-2" onClick={() => handleIngredienteAdd(index, producto.idProducto)}>
                                        Agregar
                                    </button>
                                </div>
                                <ul className="list-group mt-2">
                                    {ingredientesSeleccionados[index] && ingredientesSeleccionados[index][producto.idProducto]?.length > 0 ? (
                                        ingredientesSeleccionados[index][producto.idProducto].map(ingrediente => (
                                            <li key={ingrediente.idIng} className="list-group-item d-flex justify-content-between align-items-center">
                                                {ingrediente.nombre}
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleIngredienteRemove(index, producto.idProducto, ingrediente.idIng)}>
                                                    Eliminar
                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item">No hay ingredientes seleccionados</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                        <button type="button" className="btn btn-danger mb-3" onClick={() => removePaquete(index)}>Eliminar Paquete</button>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Crear Pedido</button>
            </form>
            <Link to="/home/pedidos" className="btn btn-secondary mt-2">Regresar</Link>
        </Container>
    );
};

export default CreatePedido;
