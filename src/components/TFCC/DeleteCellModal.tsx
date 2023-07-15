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
import { TFCCCellType, SetState } from '../../../types/types';

function DeleteCellModal({
  closeDeleteModal,
  deleteModalOpen,
  cell,
  allCells,
  setAllCells,
  navigateFunction,
}: {
  deleteModalOpen: boolean;
  closeDeleteModal: () => void;
  cell: TFCCCellType | undefined;
  allCells?: TFCCCellType[];
  setAllCells?: SetState<TFCCCellType[] | undefined>;
  navigateFunction?: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    dispatch(openLoadingIndicator({ text: 'Deleting Cell' }));
    const currentUser = getUserSession();

    try {
      const response = await appAxios.delete('/tfcc/cell/' + cell?.cell_id, {
        headers: {
          Authorization: currentUser ? currentUser?.token : null,
        },
      });
      sendFeedback(response.data?.message, 'success');

      setAllCells &&
        setAllCells(
          allCells?.filter((item: TFCCCellType) => item.cell_id !== cell?.cell_id)
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
      title='Delete Cell'
    >
      <div>
        <p className='text-center md:text-left mb-10'>
          You are trying to delete this cell with cell leader: ({cell?.cell_leader}). Are
          you sure you want to continue?
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

export default DeleteCellModal;
