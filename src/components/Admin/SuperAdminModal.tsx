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

function SuperAdminModal({
  closeSuperModal,
  superModalOpen,
  admin,
  allAdmins,
  setAllAdmins,
  navigateFunction,
}: {
  superModalOpen: boolean;
  closeSuperModal: () => void;
  admin: AdminType | null;
  allAdmins?: AdminType[] | null;
  setAllAdmins?: SetState<AdminType[] | undefined>;
  navigateFunction?: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleSuper = async () => {
    dispatch(openLoadingIndicator({ text: 'Updating Admin' }));
    const currentUser = getUserSession();

    try {
      const response = await appAxios.patch(
        '/admin/super',
        {
          id: admin?.id,
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
              item.role = 'superAdmin';
            }
            return item;
          })
        );

      closeSuperModal();
      navigateFunction && navigateFunction();
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };

  return (
    <CustomModal
      modalState={superModalOpen}
      closeModal={closeSuperModal}
      title='Make Super Admin'
    >
      <div>
        <p className='text-center md:text-left mb-10'>
          You are trying to grant super admin access this Admin: ({admin?.fullname}). Are
          you sure you want to continue?
        </p>
        <div className='flex items-center justify-center gap-5 flex-wrap md:justify-start'>
          <Button className='md:max-w-[200px] bg-error' onClick={handleSuper}>
            Yes, Continue
          </Button>
          <Button className='md:max-w-[200px] bg-dark' onClick={closeSuperModal}>
            No, Cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}

export default SuperAdminModal;
