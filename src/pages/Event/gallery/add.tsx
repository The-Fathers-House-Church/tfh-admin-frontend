import React from 'react';
import BackButton from '../../../common/Button/BackButton';
import AddGalleryImages from '../../../components/Event/Gallery/AddGalleryImages';
import AppLayout from '../../../layout/AppLayout';

function AddGallery() {
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Add Image to Gallery'>
      <AddGalleryImages />
    </AppLayout>
  );
}

export default AddGallery;
