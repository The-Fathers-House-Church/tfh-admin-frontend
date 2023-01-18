import Devotional from '../../pages/Devotional';
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
];
