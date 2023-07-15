import React from 'react';
import { useParams } from 'react-router-dom';
import { TFCCLeaderType } from '../../../../types/types';
import { appAxios } from '../../../api/axios';
import BackButton from '../../../common/Button/BackButton';
import EditLeaderForm from '../../../components/TFCC/EditLeaderForm';
import AppLayout from '../../../layout/AppLayout';
import { useAppDispatch } from '../../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../../store/slices/loadingIndicator';

function EditLeader() {
  const [leader, setLeader] = React.useState<TFCCLeaderType | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    const getLeader = async () => {
      try {
        dispatch(openLoadingIndicator({ text: 'Retrieving Leader' }));
        const response = await appAxios.get('/tfcc/leader/' + id);
        setLeader(response.data.leader);
      } catch (error) {
        setLeader(undefined);
      } finally {
        dispatch(closeLoadingIndicator());
      }
    };
    getLeader();
  }, []);
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Edit TFCC Leader'>
      {leader ? (
        <EditLeaderForm leader={leader} />
      ) : (
        <span className='text-sm'>Leader not found</span>
      )}
    </AppLayout>
  );
}

export default EditLeader;
