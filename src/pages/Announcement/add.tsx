import React from 'react';
import BackButton from '../../common/Button/BackButton';
import AddAnnouncementForm from '../../components/Announcement/AddAnnouncementForm';
import AppLayout from '../../layout/AppLayout';

function AddAnnouncement() {
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Add Announcement'>
      <AddAnnouncementForm />
    </AppLayout>
  );
}

export default AddAnnouncement;
