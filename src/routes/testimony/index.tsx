import Testimony from '../../pages/Testimony';
import { checkPrivateRoute } from '../utils';

export const testimonyRoutes = [
  {
    path: '/testimony',
    element: <Testimony />,
    loader: checkPrivateRoute,
  },
];
