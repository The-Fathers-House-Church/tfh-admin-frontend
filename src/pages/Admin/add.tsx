import React from 'react';
import BackButton from '../../common/Button/BackButton';
import AddAdminForm from '../../components/Admin/AddAdminForm';
import AppLayout from '../../layout/AppLayout';

function AddAdmin() {
	return (
		<AppLayout pageAction={<BackButton />} pageTitle='Add Admin'>
			<AddAdminForm />
		</AppLayout>
	);
}

export default AddAdmin;
