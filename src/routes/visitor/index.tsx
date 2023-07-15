import { checkPrivateRoute } from '../utils';
import Visitation from '../../pages/Visitation';
import AddVisitor from '../../pages/Visitation/add';
import FirstTimers from '../../pages/Visitation/first-timer';
import AssignedFirstTimers from '../../pages/Visitation/first-timer/assigned';
import AllVisitors from '../../pages/Visitation/all';
import SecondTimers from '../../pages/Visitation/second-timer';
import AssignedSecondTimers from '../../pages/Visitation/second-timer/assigned';
import EditVisitor from '../../pages/Visitation/edit';

export const visitationRoutes = [
  {
    path: '/visitation',
    element: <Visitation />,
    loader: checkPrivateRoute,
  },
  // unit
  {
    path: '/visitation/add',
    element: <AddVisitor />,
    loader: checkPrivateRoute,
  },
  {
    path: '/visitation/edit/:id',
    element: <EditVisitor />,
    loader: checkPrivateRoute,
  },
  {
    path: '/visitation/first-timers',
    element: <FirstTimers />,
    loader: checkPrivateRoute,
  },
  {
    path: '/visitation/assigned-first-timers',
    element: <AssignedFirstTimers />,
    loader: checkPrivateRoute,
  },
  {
    path: '/visitation/second-timers',
    element: <SecondTimers />,
    loader: checkPrivateRoute,
  },
  {
    path: '/visitation/assigned-second-timers',
    element: <AssignedSecondTimers />,
    loader: checkPrivateRoute,
  },
  {
    path: '/visitation/all',
    element: <AllVisitors />,
    loader: checkPrivateRoute,
  },
];
