import React from 'react';
import { appAxios } from '../../api/axios';
import Pagination from '../../common/Pagination';
import UserCard from '../../components/Users/UserCard';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { UserType } from '../../../types/types';
import { UserSummaryType } from '../../../types/statistics';
import StatisticsCard from '../../common/StatisticsCard/StatisticsCard';
import SectionHeader from '../../common/SectionHeader';

function User() {
  const dispatch = useAppDispatch();
  const [users, setUsers] = React.useState<UserType[] | undefined>([]);
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const currentUser = getUserSession();
  const [stats, setStats] = React.useState<UserSummaryType | undefined>(undefined);

  React.useEffect(() => {
    const getAllUsers = async () => {
      dispatch(openLoadingIndicator({ text: 'Retrieving Users' }));

      try {
        const response = await appAxios.get(`/user?page=${page}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setUsers(response.data.data?.data);
        setTotalResults(response.data.data?.totalResults);
      } catch (error) {
        setUsers([]);
        sendCatchFeedback(error);
      }
      dispatch(closeLoadingIndicator());
    };
    getAllUsers();
  }, [page]);

  React.useEffect(() => {
    const getStats = async () => {
      try {
        const response = await appAxios.get(`/statistics/user`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setStats(response.data.data);
      } catch (error) {
        setStats(undefined);
        sendCatchFeedback(error);
      }
    };
    getStats();
  }, [dispatch]);

  return (
    <AppLayout pageTitle='Users'>
      {stats && (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-10'>
          <StatisticsCard title='Registered Members' value={stats.registeredMembers} />
          <StatisticsCard title='Total Users' value={stats.totalUsers} />
          <StatisticsCard
            title='Registered via Mobile'
            value={stats.userRegisteredByMobile}
          />
          <StatisticsCard title='Registered via Web' value={stats.userRegisteredByWeb} />
        </div>
      )}

      {users && users.length ? (
        <>
          <SectionHeader title='All Users' />
          <div className='flex flex-col gap-5'>
            {users.map((user) => (
              <UserCard user={user} key={user.id} />
            ))}
          </div>
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </>
      ) : (
        <>No user found</>
      )}
    </AppLayout>
  );
}

export default User;
