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
import { AdminType, SetState } from '../../../types/types';

function ActivateModal({
  closeActivateModal,
  activateModalOpen,
  admin,
  allAdmins,
  setAllAdmins,
  navigateFunction,
}: {
  activateModalOpen: boolean;
  closeActivateModal: () => void;
  admin: AdminType | null;
  allAdmins?: AdminType[] | null;
  setAllAdmins?: SetState<AdminType[] | undefined>;
  navigateFunction?: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleActivate = async () => {
    dispatch(openLoadingIndicator({ text: 'Activating Admin' }));
    const currentUser = getUserSession();

    try {
      const response = await appAxios.patch(
        '/admin/status',
        {
          id: admin?.id,
          status: true,
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      setAllAdmins &&
        setAllAdmins(
          allAdmins?.map((item: AdminType) => {
            if (item.id === admin?.id) {
              item.active = true;
            }
            return item;
          })
        );

      closeActivateModal();
      navigateFunction && navigateFunction();
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };

  return (
    <CustomModal
      modalState={activateModalOpen}
      closeModal={closeActivateModal}
      title='Activate Admin'
    >
      <div>
        <p className='text-center md:text-left mb-10'>
          You are trying to activate this Admin: ({admin?.fullname}). Are you sure you
          want to continue?
        </p>
        <div className='flex items-center justify-center gap-5 flex-wrap md:justify-start'>
          <Button className='md:max-w-[200px] bg-success' onClick={handleActivate}>
            Yes, Activate
          </Button>
          <Button className='md:max-w-[200px] bg-dark' onClick={closeActivateModal}>
            No, Cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}

export default ActivateModal;
