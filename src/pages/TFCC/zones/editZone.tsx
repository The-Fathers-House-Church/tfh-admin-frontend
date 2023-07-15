import React from 'react';
import { useParams } from 'react-router-dom';
import { TFCCZoneType } from '../../../../types/types';
import { appAxios } from '../../../api/axios';
import BackButton from '../../../common/Button/BackButton';
import EditZoneForm from '../../../components/TFCC/EditZoneForm';
import AppLayout from '../../../layout/AppLayout';
import { useAppDispatch } from '../../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../../store/slices/loadingIndicator';

function EditZone() {
  const [zone, setZone] = React.useState<TFCCZoneType | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    const getZone = async () => {
      try {
        dispatch(openLoadingIndicator({ text: 'Retrieving Zone' }));
        const response = await appAxios.get('/tfcc/zone/' + id);
        setZone(response.data.zone);
      } catch (error) {
        setZone(undefined);
      } finally {
        dispatch(closeLoadingIndicator());
      }
    };
    getZone();
  }, []);
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Edit TFCC Zone'>
      {zone ? (
        <EditZoneForm zone={zone} />
      ) : (
        <span className='text-sm'>Zone not found</span>
      )}
    </AppLayout>
  );
}

export default EditZone;
