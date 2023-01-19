import Events from '../../pages/Event';
import AddEvent from '../../pages/Event/add';
import EditEvent from '../../pages/Event/edit';
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
];
