import { announcementRoutes } from './announcement/index';
import { givingRoutes } from './giving/index';
import { feedbackRoutes } from './feedback/index';
import { testimonyRoutes } from './testimony/index';
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
  ...testimonyRoutes,
  ...feedbackRoutes,
  ...givingRoutes,
  ...announcementRoutes,
];
