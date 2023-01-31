import React from 'react';
import PageHeader from '../../common/PageHeader/PageHeader';
import { sendCatchFeedback } from '../../functions/feedback';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { getUserSession } from '../../functions/userSession';
import { appAxios } from '../../api/axios';
import { GeneralSummaryType } from '../../../types/statistics';
import StatisticsCard from '../../common/StatisticsCard/StatisticsCard';

function Dashboard() {
  const dispatch = useAppDispatch();
  const currentUser = getUserSession();
  const [stats, setStats] = React.useState<GeneralSummaryType | undefined>(undefined);

  React.useEffect(() => {
    const getStats = async () => {
      dispatch(openLoadingIndicator({ text: 'Fetching Statistics' }));

      try {
        const response = await appAxios.get(`/statistics`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setStats(response.data.data);
      } catch (error) {
        setStats(undefined);
        sendCatchFeedback(error);
      }
      dispatch(closeLoadingIndicator());
    };
    getStats();
  }, [dispatch]);

  return (
    <AppLayout>
      {!stats ? (
        <>No Statistics Found</>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
          <StatisticsCard
            title='Pending Testimonies'
            value={stats.pendingTestimonies}
            link='/testimony'
          />
          <StatisticsCard title='Total Admins' value={stats.totalAdmins} link='/admin' />
          <StatisticsCard
            title='Total Announcements'
            value={stats.totalAnnouncements}
            link='/announcement'
          />
          <StatisticsCard
            title='Total Devotionals'
            value={stats.totalDevotionals}
            link='/devotional'
          />
          <StatisticsCard title='Total Users' value={stats.totalUsers} link='/users' />
          <StatisticsCard
            title='Unread Feedback'
            value={stats.unreadFeedback}
            link='/feedback'
          />
          <StatisticsCard
            title='Upcoming Events'
            value={stats.upcomingEvents}
            link='/event'
          />
        </div>
      )}
    </AppLayout>
  );
}

export default Dashboard;
