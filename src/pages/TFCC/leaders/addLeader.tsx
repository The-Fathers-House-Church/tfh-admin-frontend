import React from 'react';
import BackButton from '../../../common/Button/BackButton';
import AddLeaderForm from '../../../components/TFCC/AddLeaderForm';
import AppLayout from '../../../layout/AppLayout';

function AddLeader() {
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Add TFCC Leader'>
      <AddLeaderForm />
    </AppLayout>
  );
}

export default AddLeader;
