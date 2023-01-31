import React from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../api/axios';
import BackButton from '../../common/Button/BackButton';
import ViewAnnouncementLayout from '../../components/Announcement/ViewAnnouncementLayout';
import { sendCatchFeedback } from '../../functions/feedback';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { AnnouncementType } from '../../../types/types';

function ViewAnnouncement() {
  const [announcementDetails, setAnnouncementDetails] = React.useState<
    AnnouncementType | undefined
  >(undefined);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getAnnouncement = async () => {
      dispatch(openLoadingIndicator({ text: 'Retrieving Announcement' }));

      try {
        const response = await appAxios.get('/announcement/' + id);
        setAnnouncementDetails(response.data.announcement);
      } catch (error) {
        setAnnouncementDetails(undefined);
        sendCatchFeedback(error);
      }
      dispatch(closeLoadingIndicator());
    };
    getAnnouncement();
  }, []);
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='View Announcement'>
      <ViewAnnouncementLayout announcement={announcementDetails} />
    </AppLayout>
  );
}

export default ViewAnnouncement;
