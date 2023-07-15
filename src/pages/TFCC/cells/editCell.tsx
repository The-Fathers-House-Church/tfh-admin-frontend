import React from 'react';
import { useParams } from 'react-router-dom';
import { TFCCCellType } from '../../../../types/types';
import { appAxios } from '../../../api/axios';
import BackButton from '../../../common/Button/BackButton';
import EditCellForm from '../../../components/TFCC/EditCellForm';
import AppLayout from '../../../layout/AppLayout';
import { useAppDispatch } from '../../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../../store/slices/loadingIndicator';

function EditCell() {
  const [cell, setCell] = React.useState<TFCCCellType | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    const getCell = async () => {
      try {
        dispatch(openLoadingIndicator({ text: 'Retrieving Cell' }));
        const response = await appAxios.get('/tfcc/cell/' + id);
        setCell(response.data.cell);
      } catch (error) {
        setCell(undefined);
      } finally {
        dispatch(closeLoadingIndicator());
      }
    };
    getCell();
  }, []);
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Edit TFCC Cell'>
      {cell ? (
        <EditCellForm cell={cell} />
      ) : (
        <span className='text-sm'>Cell not found</span>
      )}
    </AppLayout>
  );
}

export default EditCell;
