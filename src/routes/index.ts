import { adminRoutes } from './admin/index';
import { devotionalRoutes } from './devotional/index';
import { usersRoutes } from './users/index';
import { authenticationRoutes } from './authentication';
import { dashboardRoutes } from './dashboard';
import { eventRoutes } from './event';

export const routes = [
	...authenticationRoutes,
	...dashboardRoutes,
	...usersRoutes,
	...devotionalRoutes,
	...eventRoutes,
	...adminRoutes,
];
