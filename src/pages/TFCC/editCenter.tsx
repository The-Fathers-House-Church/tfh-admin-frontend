import React from 'react';
import { useParams } from 'react-router-dom';
import { TFCCType } from '../../../types/types';
import { appAxios } from '../../api/axios';
import BackButton from '../../common/Button/BackButton';
import EditCenterForm from '../../components/TFCC/EditCenterForm';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';

function EditCenter() {
  const [center, setCenter] = React.useState<TFCCType | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    const getCenter = async () => {
      try {
        dispatch(openLoadingIndicator({ text: 'Retrieving Center' }));
        const response = await appAxios.get('/tfcc/center/' + id);
        setCenter(response.data.center);
      } catch (error) {
        setCenter(undefined);
      } finally {
        dispatch(closeLoadingIndicator());
      }
    };
    getCenter();
  }, []);
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Edit TFCC Center'>
      {center ? (
        <EditCenterForm center={center} />
      ) : (
        <span className='text-sm'>Center not found</span>
      )}
    </AppLayout>
  );
}

export default EditCenter;
