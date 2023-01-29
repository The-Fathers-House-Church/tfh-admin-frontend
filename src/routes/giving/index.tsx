import Giving from '../../pages/Giving';
import { checkPrivateRoute } from '../utils';

export const givingRoutes = [
  {
    path: '/giving',
    element: <Giving />,
    loader: checkPrivateRoute,
  },
];
