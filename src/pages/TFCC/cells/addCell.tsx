import React from 'react';
import BackButton from '../../../common/Button/BackButton';
import AddCellForm from '../../../components/TFCC/AddCellForm';
import AppLayout from '../../../layout/AppLayout';

function AddCell() {
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Add TFCC Center'>
      <AddCellForm />
    </AppLayout>
  );
}

export default AddCell;
