import React from 'react';
import BackButton from '../../../common/Button/BackButton';
import AddZoneForm from '../../../components/TFCC/AddZoneForm';
import AppLayout from '../../../layout/AppLayout';

function AddZone() {
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Add TFCC Zone'>
      <AddZoneForm />
    </AppLayout>
  );
}

export default AddZone;
