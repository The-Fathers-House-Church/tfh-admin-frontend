import { authenticationRoutes } from './authentication';
import { dashboardRoutes } from './dashboard';

export const routes = [
	...authenticationRoutes,
	...dashboardRoutes,
];
