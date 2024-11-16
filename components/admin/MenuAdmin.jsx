import React from 'react';
import { Link } from 'react-router-dom';
import './css/MenuAdmin.css'; // Archivo CSS para estilos personalizados
import Container from '../Container';

const MenuAdmin = () => {
    return (
        <Container>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                        <h2 className="text-center mb-4">Menú principal</h2>
                        <table className="menu-table table table-striped">
                            <tbody>
                                <tr>
                                    <td><Link to="/admin/roles" className="btn btn-outline-primary btn-block">Gestionar Roles</Link></td>
                                    <td><Link to="/admin/usuarios" className="btn btn-outline-primary btn-block">Gestionar Usuarios</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="/admin/tipo" className="btn btn-outline-primary btn-block">Gestionar Tipos</Link></td>
                                    <td><Link to="/admin/ing" className="btn btn-outline-primary btn-block">Gestionar Ingredientes</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="/admin/producto" className="btn btn-outline-primary btn-block">Gestionar Productos</Link></td>
                                    <td><Link to="/admin/paquete" className="btn btn-outline-primary btn-block">Gestionar Paquetes</Link></td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="text-center" style={{ paddingTop: '20px' }}>
                                        <Link to="/admin/consulta/"   className="btn" style={{ transition: 'background 0.3s, color 0.3s' }}>
                                            CONSULTAR CORTE
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="text-center" style={{ paddingTop: '20px' }}>
                                        <Link to="/" className="btn btn-secondary btn-block mt-2" style={{ transition: 'background 0.3s, color 0.3s' }}>
                                            SALIR
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        </Container>
    );
};

export default MenuAdmin;
