import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import '@syncfusion/ej2-react-spreadsheet/styles/material.css';
import './Spreadsheet.css';
import { Link } from 'react-router-dom';

const URI_PEDIDOS_FECHA = 'http://localhost:8000/pedidos/date/';

const Corte = () => {
    const { fecha } = useParams(); // Obtener la fecha de los parámetros de la URL
    const [pedidos, setPedidos] = useState([]);
    const spreadsheetRef = useRef(null);
   
    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const res = await axios.get(`${URI_PEDIDOS_FECHA}${fecha}`);
                const pedidosProcesados = res.data.map(pedido => ({
                    idPedido: pedido.idPedido,
                    cliente: pedido.cliente,
                    fecha: pedido.fecha,
                    hora: pedido.hora,
                    estado: pedido.estado,
                    total: pedido.total,
                    cantidadPaquetes: pedido.cantidadPaquetes,
                    assignedPaq: pedido.assignedPaq.map(paquete => `${paquete.nombre} - $${paquete.precio}`).join(', '),
                    detalles: pedido.detalles.map(detalle => `${detalle.ingrediente?.nombre || 'Ingrediente no encontrado'}`).join(', ')
                }));
                setPedidos(pedidosProcesados);
            } catch (error) {
                console.error('Error fetching pedidos:', error);
            }
        };

        fetchPedidos();
    }, [fecha]);

    useEffect(() => {
        if (spreadsheetRef.current && pedidos.length > 0) {
            spreadsheetRef.current.sheets[0].ranges = [{
                dataSource: pedidos,
                startCell: 'A1',
                showHeader: true,
                columns: [
                    { field: 'idPedido', headerText: 'ID Pedido', width: 80 },
                    { field: 'cliente', headerText: 'Cliente', width: 100 },
                    { field: 'fecha', headerText: 'Fecha', width: 100 },
                    { field: 'hora', headerText: 'Hora', width: 100 },
                    { field: 'estado', headerText: 'Estado', width: 100 },
                    { field: 'total', headerText: 'Total', width: 100, format: '$#,##0.00' },
                    { field: 'cantidadPaquetes', headerText: 'Cantidad Paquetes', width: 150 },
                    { field: 'assignedPaq', headerText: 'Paquetes', width: 200 },
                    { field: 'detalles', headerText: 'Detalles', width: 200 }
                ]
            }];
            spreadsheetRef.current.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#ff8026', color: '#ffffff' }, 'A1:I1'); // Estilo para el encabezado
            spreadsheetRef.current.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'A2:I100'); // Estilo para las celdas de datos
            spreadsheetRef.current.wrap('A2:I100', true);

            // Agregar la fórmula para la suma total de las ventas
            const totalVentasFormula = `=SUM(F2:F${pedidos.length + 1})`;
            spreadsheetRef.current.updateCell({ formula: totalVentasFormula }, 'N1');
            spreadsheetRef.current.updateCell({ value: 'TOTAL DE VENTAS' }, 'M1');
            spreadsheetRef.current.cellFormat({ backgroundColor: '#9ff695', color: 'black', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'M1:N1');

            spreadsheetRef.current.refresh();
        }
    }, [pedidos]);

    return (
        <div className="spreadsheet-container">
            <SpreadsheetComponent ref={spreadsheetRef} allowOpen={true} openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open'
            allowSave={true}
            saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'>
                <SheetsDirective>
                    <SheetDirective name="Pedidos">
                        <RangesDirective>
                            <RangeDirective dataSource={pedidos} startCell="A1" showHeader={true} />
                        </RangesDirective>
                    </SheetDirective>
                </SheetsDirective>
            </SpreadsheetComponent>
            <div className="buttons-container">
                <Link to="/admin/consulta" className="btn btn-secondary mt-2">Regresar</Link>
                
            </div>
        </div>
    );
};

export default Corte;
