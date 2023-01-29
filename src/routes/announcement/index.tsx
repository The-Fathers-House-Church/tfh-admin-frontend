import Announcements from '../../pages/Announcement';
import AddAnnouncement from '../../pages/Announcement/add';
import EditAnnouncement from '../../pages/Announcement/edit';
import ViewAnnouncement from '../../pages/Announcement/view';
import { checkPrivateRoute } from '../utils';

export const announcementRoutes = [
  {
    path: '/announcement',
    element: <Announcements />,
    loader: checkPrivateRoute,
  },
  {
    path: '/announcement/view/:id',
    element: <ViewAnnouncement />,
    loader: checkPrivateRoute,
  },
  {
    path: '/announcement/new',
    element: <AddAnnouncement />,
    loader: checkPrivateRoute,
  },
  {
    path: '/announcement/edit/:id',
    element: <EditAnnouncement />,
    loader: checkPrivateRoute,
  },
];
