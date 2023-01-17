import { usersRoutes } from './users/index';
import { authenticationRoutes } from './authentication';
import { dashboardRoutes } from './dashboard';

export const routes = [
	...authenticationRoutes,
	...dashboardRoutes,
	...usersRoutes,
];
