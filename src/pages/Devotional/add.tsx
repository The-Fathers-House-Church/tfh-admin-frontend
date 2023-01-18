import React from 'react';
import BackButton from '../../common/Button/BackButton';
import AddDevotionalForm from '../../components/Devotional/AddDevotionalForm';
import AppLayout from '../../layout/AppLayout';

function AddDevotional() {
	return (
		<AppLayout pageAction={<BackButton />} pageTitle='Add Devotional'>
			<AddDevotionalForm />
		</AppLayout>
	);
}

export default AddDevotional;
