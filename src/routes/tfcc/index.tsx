import TFCCSessions from '../../pages/TFCC';
import AddCenter from '../../pages/TFCC/addCenter';
import AddZone from '../../pages/TFCC/addZone';
import EditCenter from '../../pages/TFCC/editCenter';
import EditZone from '../../pages/TFCC/editZone';
import { checkPrivateRoute } from '../utils';

export const tfccRoutes = [
  {
    path: '/tfcc',
    element: <TFCCSessions />,
    loader: checkPrivateRoute,
  },
  {
    path: '/tfcc/center/new',
    element: <AddCenter />,
    loader: checkPrivateRoute,
  },
  {
    path: '/tfcc/zone/new',
    element: <AddZone />,
    loader: checkPrivateRoute,
  },
  {
    path: '/tfcc/center/edit/:id',
    element: <EditCenter />,
    loader: checkPrivateRoute,
  },
  {
    path: '/tfcc/zone/edit/:id',
    element: <EditZone />,
    loader: checkPrivateRoute,
  },
];
