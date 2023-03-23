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
import { TFCCZoneType, SetState } from '../../../types/types';

function DeleteZoneModal({
  closeDeleteModal,
  deleteModalOpen,
  zone,
  allZones,
  setAllZones,
  navigateFunction,
}: {
  deleteModalOpen: boolean;
  closeDeleteModal: () => void;
  zone: TFCCZoneType | undefined;
  allZones?: TFCCZoneType[];
  setAllZones?: SetState<TFCCZoneType[] | undefined>;
  navigateFunction?: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    dispatch(openLoadingIndicator({ text: 'Deleting Zone' }));
    const currentUser = getUserSession();

    try {
      const response = await appAxios.delete('/tfcc/zone/' + zone?._id, {
        headers: {
          Authorization: currentUser ? currentUser?.token : null,
        },
      });
      sendFeedback(response.data?.message, 'success');

      setAllZones &&
        setAllZones(allZones?.filter((item: TFCCZoneType) => item._id !== zone?._id));

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
      title='Delete Zone'
    >
      <div>
        <p className='text-center md:text-left mb-10'>
          You are trying to delete this Zone: ({zone?.name}). Are you sure you want to
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

export default DeleteZoneModal;
