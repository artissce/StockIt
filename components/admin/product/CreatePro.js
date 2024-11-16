import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Container from '../../Container'
import { validarNombre, validarPrecio, validarCategoria, validarDescripcion, validarIngredientes } from '../../Validaciones'
import Alert from '../../Alert' // Importa el componente Alert para mostrar mensajes de error

const URI = 'http://localhost:8000/producto/'
const URI_ING = 'http://localhost:8000/ing/'

const CreatePro = () => {
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [categoria, setCategoria] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [cantIng, setCantIng] = useState(1)
    const [ingredientes, setIngredientes] = useState([''])
    const [ingredientesList, setIngredientesList] = useState([])
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getIngredientesList()
    }, [])

    const getIngredientesList = async () => {
        try {
            const res = await axios.get(URI_ING)
            console.log("Lista de ingredientes:", res.data) // Verificar que los datos se reciban correctamente
            setIngredientesList(res.data)
        } catch (error) {
            console.error("Error al obtener los ingredientes:", error)
        }
    }

    const handleIngredientChange = (index, value) => {
        const newIngredientes = [...ingredientes]
        newIngredientes[index] = value
        setIngredientes(newIngredientes)
    }

    const addIngredientField = () => {
        setCantIng(cantIng + 1)
        setIngredientes([...ingredientes, ''])
    }

    const removeIngredientField = (index) => {
        const newIngredientes = [...ingredientes]
        newIngredientes.splice(index, 1)
        setIngredientes(newIngredientes)
        setCantIng(cantIng - 1)
    }

    const validateForm = () => {
        const nombreError = validarNombre(nombre)
        const precioError = validarPrecio(precio)
        const categoriaError = validarCategoria(categoria)
        const descripcionError = validarDescripcion(descripcion)
        const ingredientesError = validarIngredientes(ingredientes)

        const newErrors = {}
        if (nombreError) newErrors.nombre = nombreError
        if (precioError) newErrors.precio = precioError
        if (categoriaError) newErrors.categoria = categoriaError
        if (descripcionError) newErrors.descripcion = descripcionError
        if (ingredientesError) newErrors.ingredientes = ingredientesError

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const store = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        try {
            await axios.post(URI, {
                nombre,
                precio,
                categoria,
                descripcion,
                cantIng,
                ingredientes,
            })
            navigate('/admin/producto')
        } catch (error) {
            console.error("Error al crear el producto:", error)
        }
    }

    return (
        <Container>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-lg-8'>
                        <h1 className='text-center'>Crear Producto</h1>
                        <form onSubmit={store}>
                            <div className='form-group'>
                                <label className='form-label'>Nombre</label>
                                <input
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                                {errors.nombre && <Alert message={errors.nombre} type="danger" />}
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Precio</label>
                                <input
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    type='number'
                                    className='form-control'
                                />
                                {errors.precio && <Alert message={errors.precio} type="danger" />}
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Categoría</label>
                                <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    className='form-control'
                                >
                                    <option value='' disabled>Selecciona una categoría</option>
                                    <option value='Postre'>Postre</option>
                                    <option value='Bebida Fría'>Bebida Fría</option>
                                    <option value='Bebida Caliente'>Bebida Caliente</option>
                                    <option value='Platillo'>Platillo</option>
                                    <option value='Desayuno'>Desayuno</option>
                                </select>
                                {errors.categoria && <Alert message={errors.categoria} type="danger" />}
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Descripción</label>
                                <textarea
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    className='form-control'
                                ></textarea>
                                {errors.descripcion && <Alert message={errors.descripcion} type="danger" />}
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
                                {errors.ingredientes && <Alert message={errors.ingredientes} type="danger" />}
                            </div>
                            <button type='submit'>Guardar</button>
                        </form>
                        <Link to="/admin/producto" className='btn btn-secondary btn-block mt-3'>Regresar</Link>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default CreatePro
