import React from 'react';
import BackButton from '../../common/Button/BackButton';
import AddEventForm from '../../components/Event/AddEventForm';
import AppLayout from '../../layout/AppLayout';

function AddEvent() {
	return (
		<AppLayout pageAction={<BackButton />} pageTitle='Add Event'>
			<AddEventForm />
		</AppLayout>
	);
}

export default AddEvent;
