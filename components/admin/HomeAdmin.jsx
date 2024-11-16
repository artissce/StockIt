import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MenuAdmin from './MenuAdmin';
import ShowRol from "./rol/ShowRol";
import CreateRol from "./rol/CreateRol";
import EditRol from "./rol/EditRol";
import ShowUser from "./user/ShowUser";
import CreateUser from "./user/CreateUser";
import EditUser from "./user/EditUser";
import CreateTI from "./ti/CreateTI";
import ShowTI from "./ti/ShowTI";
import EditTI from "./ti/EditTI";
import ShowIng from './ing/ShowIng';
import CreateIng from './ing/CreateIng';
import EditIng from './ing/EditIng';
import CreatePro from './product/CreatePro';
import EditPro from './product/EditPro';
import ShowPro from './product/ShowPro';
import ShowPaq from './paq/ShowPaq';
import CreatePaq from './paq/CreatePaq';
import EditPaq from './paq/EditPaq';
import ConsulCorte from './consulCorte';
import Corte from './Corte';

export function HomeAdmin() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MenuAdmin />} />
                <Route path="roles" element={<ShowRol />} />
                <Route path="roles/create" element={<CreateRol />} />
                <Route path="roles/edit/:idRol" element={<EditRol />} />
                <Route path="usuarios" element={<ShowUser />} />
                <Route path="usuarios/create" element={<CreateUser />} />
                <Route path="usuarios/edit/:idUser" element={<EditUser />} />
                <Route path="tipo" element={<ShowTI />} />
                <Route path="tipo/create" element={<CreateTI />} />
                <Route path="tipo/edit/:idTipo" element={<EditTI />} />
                <Route path="ing" element={<ShowIng />} />
                <Route path="ing/create" element={<CreateIng />} />
                <Route path="ing/edit/:idIng" element={<EditIng />} />
                <Route path="producto" element={<ShowPro />} />
                <Route path="producto/create" element={<CreatePro />} />
                <Route path="producto/edit/:idProducto" element={<EditPro />} />
                <Route path="paquete" element={<ShowPaq />} />
                <Route path="paquete/create" element={<CreatePaq />} />
                <Route path="paquete/edit/:idPaquete" element={<EditPaq />} />
                <Route path="consulta/" element={<ConsulCorte />} />
                <Route path="consulta/:fecha" element={<Corte/>} />
            </Routes>
        </div>
    );
}
