import Devotional from '../../pages/Devotional';
import AddDevotional from '../../pages/Devotional/add';
import EditDevotional from '../../pages/Devotional/edit';
import ViewDevotional from '../../pages/Devotional/view';
import { checkPrivateRoute } from '../utils';

export const devotionalRoutes = [
	{
		path: '/devotional',
		element: <Devotional />,
		loader: checkPrivateRoute,
	},
	{
		path: '/devotional/view/:id',
		element: <ViewDevotional />,
		loader: checkPrivateRoute,
	},
	{
		path: '/devotional/new',
		element: <AddDevotional />,
		loader: checkPrivateRoute,
	},
	{
		path: '/devotional/edit/:id',
		element: <EditDevotional />,
		loader: checkPrivateRoute,
	},
];
