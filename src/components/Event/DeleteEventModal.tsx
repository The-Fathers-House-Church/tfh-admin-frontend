import React from 'react';
import { appAxios } from '../../api/axios';
import Button from '../../common/Button/Button';
import CustomModal from '../../common/CustomModal/CustomModal';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { EventType, SetState } from '../../../types/types';

function DeleteEventModal({
  closeDeleteModal,
  deleteModalOpen,
  event,
  allEvents,
  setAllEvents,
  navigateFunction,
}: {
  deleteModalOpen: boolean;
  closeDeleteModal: () => void;
  event: EventType | undefined;
  allEvents?: EventType[];
  setAllEvents?: SetState<EventType[] | undefined>;
  navigateFunction?: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    dispatch(openLoadingIndicator({ text: 'Deleting Event' }));
    const currentUser = getUserSession();

    try {
      const response = await appAxios.delete('/event/' + event?._id, {
        headers: {
          Authorization: currentUser ? currentUser?.token : null,
        },
      });
      sendFeedback(response.data?.message, 'success');

      setAllEvents &&
        setAllEvents(allEvents?.filter((item: EventType) => item._id !== event?._id));

      closeDeleteModal();
      navigateFunction && navigateFunction();
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };

  return (
    <CustomModal
      modalState={deleteModalOpen}
      closeModal={closeDeleteModal}
      title='Delete Event'
    >
      <div>
        <p className='text-center md:text-left mb-10'>
          You are trying to delete this Event: ({event?.name}). Are you sure you want to
          continue?
        </p>
        <div className='flex items-center justify-center gap-5 flex-wrap md:justify-start'>
          <Button className='md:max-w-[200px] bg-error' onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button className='md:max-w-[200px] bg-dark' onClick={closeDeleteModal}>
            No, Cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}

export default DeleteEventModal;
