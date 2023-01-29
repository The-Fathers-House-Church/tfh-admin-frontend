import Feedback from '../../pages/Feedback';
import { checkPrivateRoute } from '../utils';

export const feedbackRoutes = [
  {
    path: '/feedback',
    element: <Feedback />,
    loader: checkPrivateRoute,
  },
];
