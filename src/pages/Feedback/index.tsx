import React from 'react';
import { appAxios } from '../../api/axios';
import Button from '../../common/Button/Button';
import Pagination from '../../common/Pagination';
import FeedbackCard from '../../components/Feedback/FeedbackCard';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { FeedbackType } from '../../../types/types';
import { FeedbackSummaryType } from '../../../types/statistics';
import StatisticsCard from '../../common/StatisticsCard/StatisticsCard';
import SectionHeader from '../../common/SectionHeader';
import { capitalize } from 'lodash';

function Feedback() {
  const dispatch = useAppDispatch();
  const [allFeedback, setFeedback] = React.useState<FeedbackType[] | undefined>([]);
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const currentUser = getUserSession();
  const [status, setStatus] = React.useState('all');
  const [stats, setStats] = React.useState<FeedbackSummaryType | undefined>(undefined);

  const statuses = ['all', 'unread', 'read'];

  React.useEffect(() => {
    const getAllFeedback = async () => {
      dispatch(openLoadingIndicator({ text: 'Retrieving Feedback' }));

      try {
        const response = await appAxios.post(
          `/feedback?page=${page}`,
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

        setFeedback(response.data.data?.results);
        setTotalResults(response.data.data?.pagination?.totalResults);
      } catch (error) {
        setFeedback([]);
        sendCatchFeedback(error);
      }
      dispatch(closeLoadingIndicator());
    };
    getAllFeedback();
  }, [page, status]);

  React.useEffect(() => {
    const getStats = async () => {
      try {
        const response = await appAxios.get(`/statistics/feedback`, {
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

  const changeFeedbackStatus = async (feedback: FeedbackType, newStatus: string) => {
    dispatch(openLoadingIndicator({ text: 'Updating Feedback' }));
    try {
      const response = await appAxios.patch(
        `/feedback/status/${feedback._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );

      sendFeedback(response.data?.message, 'success');

      setFeedback(
        allFeedback?.map((item) => {
          if (item._id === feedback._id) {
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
    <AppLayout pageTitle='Feedback'>
      {stats && (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-10'>
          <StatisticsCard title='Sent via Mobile' value={stats.feedbackSentByMobile} />
          <StatisticsCard title='Sent via Web' value={stats.feedbackSentByWeb} />
          <StatisticsCard title='Total Feedback' value={stats.totalFeedback} />
          <StatisticsCard title='Unread Feedback' value={stats.unreadFeedback} />
        </div>
      )}
      <SectionHeader title={`${capitalize(status)} Feedback`} />

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
      {allFeedback && allFeedback.length ? (
        <>
          <div className='flex flex-col gap-5'>
            {allFeedback.map((feedback) => (
              <FeedbackCard
                feedback={feedback}
                key={feedback._id}
                changeFeedbackStatus={changeFeedbackStatus}
              />
            ))}
          </div>
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </>
      ) : (
        <>No feedback found</>
      )}
    </AppLayout>
  );
}

export default Feedback;
