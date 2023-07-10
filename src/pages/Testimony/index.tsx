import React from 'react';
import { appAxios } from '../../api/axios';
import Button from '../../common/Button/Button';
import Pagination from '../../common/Pagination';
import TestimonyCard from '../../components/Testimony/TestimonyCard';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { TestimonyType } from '../../../types/types';
import { TestimonySummaryType } from '../../../types/statistics';
import StatisticsCard from '../../common/StatisticsCard/StatisticsCard';
import SectionHeader from '../../common/SectionHeader';
import { capitalize } from 'lodash';

function Testimony() {
  const dispatch = useAppDispatch();
  const [testimonies, setTestimonies] = React.useState<TestimonyType[] | undefined>([]);
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const currentUser = getUserSession();
  const [status, setStatus] = React.useState('all');
  const [stats, setStats] = React.useState<TestimonySummaryType | undefined>(undefined);

  const statuses = ['all', 'pending', 'approved', 'declined', 'archived'];

  React.useEffect(() => {
    const getAllTestimonies = async () => {
      dispatch(openLoadingIndicator({ text: 'Retrieving Testimonies' }));

      try {
        const response = await appAxios.post(
          `/testimony?page=${page}`,
          {
            ...(status !== 'all' && {
              status,
            }),
          },
          {
            headers: {
              Authorization: currentUser ? currentUser?.token : null,
            },
          }
        );

        setTestimonies(response.data.data?.data);
        setTotalResults(response.data.data?.totalResults);
      } catch (error) {
        setTestimonies([]);
        sendCatchFeedback(error);
      }
      dispatch(closeLoadingIndicator());
    };
    getAllTestimonies();
  }, [page, status]);

  React.useEffect(() => {
    const getStats = async () => {
      try {
        const response = await appAxios.get(`/statistics/testimony`, {
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

  const changeTestimonyStatus = async (
    testimony: TestimonyType,
    newStatus: 'pending' | 'approved' | 'declined' | 'archived'
  ) => {
    dispatch(openLoadingIndicator({ text: 'Updating Testimony' }));
    try {
      const response = await appAxios.patch(
        `/testimony/${testimony.test_id}/change-status`,
        { status: newStatus },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );

      sendFeedback(response.data?.message, 'success');

      setTestimonies(
        testimonies?.map((item) => {
          if (item.test_id === testimony.test_id) {
            item.status = newStatus;
          }
          return item;
        })
      );
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };

  return (
    <AppLayout pageTitle='Testimonies'>
      {stats && (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-10'>
          <StatisticsCard title='Sent via Mobile' value={stats.testimonySentByMobile} />
          <StatisticsCard title='Sent via Web' value={stats.testimonySentByWeb} />
          <StatisticsCard title='Total Testimonies' value={stats.totalTestimonies} />
          <StatisticsCard title='Pending Testimonies' value={stats.pendingTestimonies} />
        </div>
      )}
      <SectionHeader title={`${capitalize(status)} Testimonies`} />

      <div className='grid grid-cols-2 md:grid-cols-5 gap-5 mb-5'>
        {statuses.map((item) => (
          <Button
            style={{
              backgroundColor: status === item ? '#FF6634' : '#F4F4F4',
              color: status === item ? '#FFF' : '#000',
            }}
            className='capitalize hover:!brightness-90'
            onClick={() => setStatus(item)}
            key={item}
          >
            {item}
          </Button>
        ))}
      </div>
      {testimonies && testimonies.length ? (
        <>
          <div className='flex flex-col gap-5'>
            {testimonies.map((testimony) => (
              <TestimonyCard
                testimony={testimony}
                key={testimony.test_id}
                changeTestimonyStatus={changeTestimonyStatus}
              />
            ))}
          </div>
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </>
      ) : (
        <>No testimony found</>
      )}
    </AppLayout>
  );
}

export default Testimony;
