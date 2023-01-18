import Devotional from '../../pages/Devotional';
import { checkPrivateRoute } from '../utils';

export const devotionalRoutes = [
	{
		path: '/devotional',
		element: <Devotional />,
		loader: checkPrivateRoute,
	},
];
