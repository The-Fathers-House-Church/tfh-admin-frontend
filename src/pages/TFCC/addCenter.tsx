import React from 'react';
import BackButton from '../../common/Button/BackButton';
import AddCenterForm from '../../components/TFCC/AddCenterForm';
import AppLayout from '../../layout/AppLayout';

function AddCenter() {
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Add TFCC Center'>
      <AddCenterForm />
    </AppLayout>
  );
}

export default AddCenter;
