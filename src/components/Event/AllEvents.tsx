import React from 'react';
import { appAxios } from '../../api/axios';
import Loader from '../../common/Loader/Loader';
import Pagination from '../../common/Pagination';
import SectionHeader from '../../common/SectionHeader';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import { EventType } from '../../../types/types';
import DeleteEventModal from './DeleteEventModal';
import EventCard from './EventCard';

function AllEvents() {
  const [loading, setLoading] = React.useState(false);

  const [events, setEvents] = React.useState<EventType[] | undefined>([]);

  const [totalResults, setTotalResults] = React.useState(0);

  const [page, setPage] = React.useState(1);

  const currentUser = getUserSession();

  const [selectedEvent, setSelectedEvent] = React.useState<EventType | undefined>(
    undefined
  );

  React.useEffect(() => {
    const getAllEvents = async () => {
      try {
        setLoading(true);

        const response = await appAxios.get(`/event?page=${page}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setEvents(response.data.data?.results);
        setTotalResults(response.data.data?.pagination?.totalResults);

        setLoading(false);
      } catch (error) {
        setEvents([]);
        sendCatchFeedback(error);

        setLoading(false);
      }
    };
    getAllEvents();
  }, [page]);

  // delete modal
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const openDeleteModal = (event: EventType) => {
    setSelectedEvent(event);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className='mt-10'>
      {loading ? (
        <Loader />
      ) : events && events?.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {events?.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                openDeleteModal={openDeleteModal}
              />
            ))}
          </div>
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </>
      ) : (
        <span className='text-md'>No event found</span>
      )}

      <DeleteEventModal
        closeDeleteModal={closeDeleteModal}
        deleteModalOpen={deleteModalOpen}
        event={selectedEvent}
        setAllEvents={setEvents}
        allEvents={events}
      />
    </div>
  );
}

export default AllEvents;
