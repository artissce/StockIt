import React from 'react';
import { Link } from 'react-router-dom';
import '../admin/css/MenuAdmin.css'; // Archivo CSS para estilos personalizados
import Container from '../Container';

const MenuHome = () => {
    return (
        <Container>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                        <h2 className="text-center mb-4">Menú de Ventas</h2>
                        <table className="menu-table table table-striped">
                            <tbody>
                                <tr>
                                    <td><Link to="/home/pedidos" className="btn btn-outline-primary btn-block">Gestionar Pedidos</Link></td>
                                    <td><Link to="/home/menu" className="btn btn-outline-primary btn-block">Ver menú</Link></td>
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

export default MenuHome;
