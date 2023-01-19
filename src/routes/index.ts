import { devotionalRoutes } from './devotional/index';
import { usersRoutes } from './users/index';
import { authenticationRoutes } from './authentication';
import { dashboardRoutes } from './dashboard';
import { eventsRoutes } from './events';

export const routes = [
	...authenticationRoutes,
	...dashboardRoutes,
	...usersRoutes,
	...devotionalRoutes,
	...eventsRoutes,
];
