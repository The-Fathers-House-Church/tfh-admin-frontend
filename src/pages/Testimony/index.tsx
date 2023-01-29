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
import { TestimonyType } from '../../types';

function Testimony() {
  const dispatch = useAppDispatch();
  const [testimonies, setTestimonies] = React.useState<TestimonyType[] | undefined>([]);
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const currentUser = getUserSession();
  const [status, setStatus] = React.useState('all');

  const statuses = ['all', 'pending', 'approved', 'declined', 'archived'];

  React.useEffect(() => {
    const getAllTestimonies = async () => {
      dispatch(openLoadingIndicator({ text: 'Retrieving Testimonies' }));

      try {
        const response = await appAxios.get(`/testimony?page=${page}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setTestimonies(response.data.data?.results);
        setTotalResults(response.data.data?.pagination?.totalResults);
      } catch (error) {
        setTestimonies([]);
        sendCatchFeedback(error);
      }
      dispatch(closeLoadingIndicator());
    };
    getAllTestimonies();
  }, [page, status]);

  const changeTestimonyStatus = async (testimony: TestimonyType, newStatus: string) => {
    dispatch(openLoadingIndicator({ text: 'Retrieving Testimonies' }));
    try {
      const response = await appAxios.patch(
        `/testimony/${testimony._id}/change-status`,
        { status: newStatus },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );

      sendFeedback(response.data?.message);

      setTestimonies(
        testimonies?.map((item) => {
          if (item._id === testimony._id) {
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
      {testimonies && testimonies.length ? (
        <>
          <div className='flex flex-col gap-5'>
            {testimonies.map((testimony) => (
              <TestimonyCard
                testimony={testimony}
                key={testimony._id}
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
