import Events from '../../pages/Events';
import AddEvent from '../../pages/Events/add';
import EditEvent from '../../pages/Events/edit';
import ViewEvent from '../../pages/Events/view';
import { checkPrivateRoute } from '../utils';

export const eventsRoutes = [
	{
		path: '/events',
		element: <Events />,
		loader: checkPrivateRoute,
	},
	{
		path: '/events/view/:id',
		element: <ViewEvent />,
		loader: checkPrivateRoute,
	},
	{
		path: '/events/new',
		element: <AddEvent />,
		loader: checkPrivateRoute,
	},
	{
		path: '/events/edit/:id',
		element: <EditEvent />,
		loader: checkPrivateRoute,
	},
];
