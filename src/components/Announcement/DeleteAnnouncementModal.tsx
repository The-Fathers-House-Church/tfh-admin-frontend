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
import { AnnouncementType, SetState } from '../../types';

function DeleteAnnouncementModal({
  closeDeleteModal,
  deleteModalOpen,
  announcement,
  allAnnouncements,
  setAllAnnouncements,
  navigateFunction,
}: {
  deleteModalOpen: boolean;
  closeDeleteModal: () => void;
  announcement: AnnouncementType | undefined;
  allAnnouncements?: AnnouncementType[];
  setAllAnnouncements?: SetState<AnnouncementType[] | undefined>;
  navigateFunction?: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    dispatch(openLoadingIndicator({ text: 'Deleting Announcement' }));
    const currentUser = getUserSession();

    try {
      const response = await appAxios.delete('/announcement/' + announcement?._id, {
        headers: {
          Authorization: currentUser ? currentUser?.token : null,
        },
      });
      sendFeedback(response.data?.message, 'success');

      setAllAnnouncements &&
        setAllAnnouncements(
          allAnnouncements?.filter(
            (item: AnnouncementType) => item._id !== announcement?._id
          )
        );

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
      title='Delete Announcement'
    >
      <div>
        <p className='text-center md:text-left mb-10'>
          You are trying to delete this Announcement: ({announcement?.title}). Are you
          sure you want to continue?
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

export default DeleteAnnouncementModal;
