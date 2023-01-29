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
import { FeedbackType } from '../../types';

function Feedback() {
  const dispatch = useAppDispatch();
  const [allFeedback, setFeedback] = React.useState<FeedbackType[] | undefined>([]);
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const currentUser = getUserSession();
  const [status, setStatus] = React.useState('all');

  const statuses = ['all', 'unread', 'read'];

  React.useEffect(() => {
    const getAllFeedback = async () => {
      dispatch(openLoadingIndicator({ text: 'Retrieving Feedback' }));

      try {
        const response = await appAxios.get(`/feedback?page=${page}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

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

  const changeFeedbackStatus = async (feedback: FeedbackType, newStatus: string) => {
    dispatch(openLoadingIndicator({ text: 'Retrieving Feedback' }));
    try {
      const response = await appAxios.patch(
        `/feedback/${feedback._id}/change-status`,
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
      <div className='grid grid-cols-2 md:grid-cols-5 gap-5 mb-10'>
        {statuses.map((item) => (
          <Button
            style={{
              backgroundColor: status === item ? '#FF6634' : '#F4F4F4',
              color: status === item ? '#FFF' : '#000',
            }}
            className='capitalize hover:!brightness-90'
            onClick={() => setStatus(item)}
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
