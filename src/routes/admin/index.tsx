import Admins from '../../pages/Admin';
import AddAdmin from '../../pages/Admin/add';
import EditAdmin from '../../pages/Admin/edit';
import { checkPrivateRoute } from '../utils';

export const adminRoutes = [
	{
		path: '/admin',
		element: <Admins />,
		loader: checkPrivateRoute,
	},
	{
		path: '/admin/new',
		element: <AddAdmin />,
		loader: checkPrivateRoute,
	},
	{
		path: '/admin/edit/:id',
		element: <EditAdmin />,
		loader: checkPrivateRoute,
	},
];
