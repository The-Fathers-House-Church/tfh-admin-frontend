import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { appAxios } from '../../../api/axios';
import BackButton from '../../../common/Button/BackButton';
import Button from '../../../common/Button/Button';
import ViewGallery from '../../../components/Event/Gallery/ViewGallery';
import AppLayout from '../../../layout/AppLayout';
import { useAppDispatch } from '../../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../../store/slices/loadingIndicator';
import { EventType } from '../../../../types/types';

function EventGallery() {
  const [eventDetails, setEventDetails] = React.useState<EventType | undefined>(
    undefined
  );
  const { id } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getEvent = async () => {
      dispatch(openLoadingIndicator({ text: 'Retrieving Event' }));

      try {
        const response = await appAxios.get('/event/' + id);
        setEventDetails(response.data.event);
      } catch (error) {
        setEventDetails(undefined);
      }
      dispatch(closeLoadingIndicator());
    };
    getEvent();
  }, []);

  return (
    <AppLayout
      pageAction={
        <div className='grid grid-flow-col gap-3 items-center'>
          <BackButton />
          {eventDetails && (
            <Link to={`/event/gallery/add/${eventDetails._id}`}>
              <Button className='max-w-[156px] !h-[40px] !p-4 w-full'>
                <FiPlus className='mr-3' />
                Add Images
              </Button>
            </Link>
          )}
        </div>
      }
      pageTitle='Event Gallery'
    >
      {eventDetails ? (
        <ViewGallery event={eventDetails} setEventDetails={setEventDetails} />
      ) : (
        <>Event not found</>
      )}
    </AppLayout>
  );
}

export default EventGallery;
