import { checkPrivateRoute } from '../utils';
import Church from '../../pages/Church';
import Units from '../../pages/Church/units';
import EditUnit from '../../pages/Church/units/edit';
import AddUnit from '../../pages/Church/units/add';
import Departments from '../../pages/Church/departments';
import AddDepartment from '../../pages/Church/departments/add';
import EditDepartment from '../../pages/Church/departments/edit';
import Branches from '../../pages/Church/branches';
import AddBranch from '../../pages/Church/branches/add';
import EditBranch from '../../pages/Church/branches/edit';

export const churchRoutes = [
  {
    path: '/church',
    element: <Church />,
    loader: checkPrivateRoute,
  },
  // unit
  {
    path: '/church/units',
    element: <Units />,
    loader: checkPrivateRoute,
  },
  {
    path: '/church/units/edit/:id',
    element: <EditUnit />,
    loader: checkPrivateRoute,
  },
  {
    path: '/church/units/new',
    element: <AddUnit />,
    loader: checkPrivateRoute,
  },
  // department
  {
    path: '/church/departments',
    element: <Departments />,
    loader: checkPrivateRoute,
  },
  {
    path: '/church/departments/new',
    element: <AddDepartment />,
    loader: checkPrivateRoute,
  },
  {
    path: '/church/departments/edit/:id',
    element: <EditDepartment />,
    loader: checkPrivateRoute,
  },
  // branches
  {
    path: '/church/branches',
    element: <Branches />,
    loader: checkPrivateRoute,
  },
  {
    path: '/church/branches/new',
    element: <AddBranch />,
    loader: checkPrivateRoute,
  },
  {
    path: '/church/branches/edit/:id',
    element: <EditBranch />,
    loader: checkPrivateRoute,
  },
];
