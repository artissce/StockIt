import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Container from '../../Container';
import { Link } from 'react-router-dom';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const URI_PEDIDOS = 'http://localhost:8000/pedidos/';

const PedidosChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const res = await axios.get(URI_PEDIDOS);
                const pedidos = res.data;

                const paqueteCounts = {};
                const ingredienteCounts = {};

                pedidos.forEach(pedido => {
                    pedido.assignedPaq.forEach(paquete => {
                        if (!paqueteCounts[paquete.nombre]) {
                            paqueteCounts[paquete.nombre] = 0;
                        }
                        paqueteCounts[paquete.nombre] += 1;

                        paquete.assignedPro.forEach(producto => {
                            pedido.detalles.forEach(detalle => {
                                if (detalle.idProducto === producto.idProducto) {
                                    const ingredienteNombre = detalle.ingrediente?.nombre || 'Ingrediente no encontrado';
                                    if (!ingredienteCounts[ingredienteNombre]) {
                                        ingredienteCounts[ingredienteNombre] = 0;
                                    }
                                    ingredienteCounts[ingredienteNombre] += 1;
                                }
                            });
                        });
                    });
                });

                setChartData({
                    labels: [...Object.keys(paqueteCounts), ...Object.keys(ingredienteCounts)],
                    datasets: [
                        {
                            label: 'Paquetes',
                            data: Object.values(paqueteCounts),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Ingredientes',
                            data: Object.values(ingredienteCounts),
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching pedidos:', error);
            }
        };

        fetchPedidos();
    }, []);

    return (
        <Container>
            <div style={{ width: '100%', height: '600px' }}>
                <Bar 
                    data={chartData} 
                    options={{ 
                        responsive: true, 
                        maintainAspectRatio: false,
                        plugins: { 
                            legend: { position: 'top' }, 
                            title: { display: true, text: 'Pedidos Detalle' } 
                        } 
                    }} 
                />
            </div>
            <div className="buttons-container">
                <Link to="/home/pedidos/" className="btn btn-secondary mt-2">Regresar a pedidos</Link>
            </div>
        </Container>
    );
};

export default PedidosChart;
