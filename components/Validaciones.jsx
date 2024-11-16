// src/Validaciones.jsx

export const validarNombre = (nombre) => {
    if (!nombre) {
        return 'El nombre no puede estar vacío';
    }
    if (nombre.length > 15) {
        return 'El nombre no puede tener más de 15 caracteres';
    }
    if (/\d/.test(nombre)) {
        return 'El nombre no puede contener números';
    }
    return null;
};

export const validarCorreo = (correo) => {
    if (!correo) {
        return 'El correo no puede estar vacío';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correo)) {
        return 'El correo no es válido';
    }
    return null;
};

export const validarContrasena = (contrasena) => {
    if (!contrasena) {
        return 'La contraseña no puede estar vacía';
    }
    if (contrasena.length < 6) {
        return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
};

export const validarSeleccion = (id) => {
    if (!id) {
        return 'Debe seleccionar un tipo';
    }
    return null;
};

export const validarPrecio = (precio) => {
    if (!precio) {
        return 'El precio no puede estar vacío';
    }
    if (isNaN(precio) || precio <= 0) {
        return 'El precio debe ser un número positivo';
    }
    return null;
};

export const validarCategoria = (categoria) => {
    if (!categoria) {
        return 'Debe seleccionar una categoría';
    }
    return null;
};

export const validarDescripcion = (descripcion) => {
    if (!descripcion) {
        return 'La descripción no puede estar vacía';
    }
    return null;
};

export const validarIngredientes = (ingredientes) => {
    if (!ingredientes || !Array.isArray(ingredientes) || ingredientes.length === 0) {
        return 'Debe agregar al menos un ingrediente';
    }
    for (let ingrediente of ingredientes) {
        if (!ingrediente) {
            return 'Debe seleccionar un ingrediente para cada campo';
        }
    }
    return null;
};