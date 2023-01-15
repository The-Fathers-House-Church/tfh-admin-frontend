import Users from '../../pages/Users';
import { checkPrivateRoute } from '../utils';

export const usersRoutes = [
	{
		path: '/users',
		element: <Users />,
		loader: checkPrivateRoute,
	},
];
