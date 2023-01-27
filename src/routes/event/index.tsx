import Events from '../../pages/Event';
import AddEvent from '../../pages/Event/add';
import EditEvent from '../../pages/Event/edit';
import AddGallery from '../../pages/Event/gallery/add';
import EventGallery from '../../pages/Event/gallery/view';
import ViewEvent from '../../pages/Event/view';
import { checkPrivateRoute } from '../utils';

export const eventRoutes = [
  {
    path: '/event',
    element: <Events />,
    loader: checkPrivateRoute,
  },
  {
    path: '/event/view/:id',
    element: <ViewEvent />,
    loader: checkPrivateRoute,
  },
  {
    path: '/event/new',
    element: <AddEvent />,
    loader: checkPrivateRoute,
  },
  {
    path: '/event/edit/:id',
    element: <EditEvent />,
    loader: checkPrivateRoute,
  },
  {
    path: '/event/gallery/:id',
    element: <EventGallery />,
    loader: checkPrivateRoute,
  },
  {
    path: '/event/gallery/add/:id',
    element: <AddGallery />,
    loader: checkPrivateRoute,
  },
];
