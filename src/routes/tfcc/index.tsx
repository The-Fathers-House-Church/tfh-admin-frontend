import TFCC from '../../pages/TFCC';
import AddCell from '../../pages/TFCC/cells/addCell';
import AddZone from '../../pages/TFCC/zones/addZone';
import EditCell from '../../pages/TFCC/cells/editCell';
import EditZone from '../../pages/TFCC/zones/editZone';
import { checkPrivateRoute } from '../utils';
import TFCCCells from '../../pages/TFCC/cells';
import TFCCZones from '../../pages/TFCC/zones';
import TFCCLeaders from '../../pages/TFCC/leaders';
import AddLeader from '../../pages/TFCC/leaders/addLeader';
import EditLeader from '../../pages/TFCC/leaders/editLeader';

export const tfccRoutes = [
  {
    path: '/tfcc',
    element: <TFCC />,
    loader: checkPrivateRoute,
  },
  // cell
  {
    path: '/tfcc/cell',
    element: <TFCCCells />,
    loader: checkPrivateRoute,
  },
  {
    path: '/tfcc/cell/edit/:id',
    element: <EditCell />,
    loader: checkPrivateRoute,
  },
  {
    path: '/tfcc/cell/new',
    element: <AddCell />,
    loader: checkPrivateRoute,
  },
  // zone
  {
    path: '/tfcc/zone',
    element: <TFCCZones />,
    loader: checkPrivateRoute,
  },
  {
    path: '/tfcc/zone/new',
    element: <AddZone />,
    loader: checkPrivateRoute,
  },
  {
    path: '/tfcc/zone/edit/:id',
    element: <EditZone />,
    loader: checkPrivateRoute,
  },
  // leader
  {
    path: '/tfcc/leader',
    element: <TFCCLeaders />,
    loader: checkPrivateRoute,
  },
  {
    path: '/tfcc/leader/new',
    element: <AddLeader />,
    loader: checkPrivateRoute,
  },
  {
    path: '/tfcc/leader/edit/:id',
    element: <EditLeader />,
    loader: checkPrivateRoute,
  },
];
