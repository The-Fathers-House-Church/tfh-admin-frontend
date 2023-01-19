import React from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../api/axios';
import BackButton from '../../common/Button/BackButton';
import ViewEventLayout from '../../components/Events/ViewEventLayout';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
	closeLoadingIndicator,
	openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { EventType } from '../../types';

function ViewEvent() {
	const [eventDetails, setEventDetails] = React.useState<EventType | undefined>(
		undefined
	);
	const { id } = useParams();
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		const getEvent = async () => {
			dispatch(openLoadingIndicator({ text: 'Retrieving Event' }));

			try {
				const response = await appAxios.get('/event/view/' + id);
				setEventDetails(response.data.event);
			} catch (error) {
				setEventDetails(undefined);
			}
			dispatch(closeLoadingIndicator());
		};
		getEvent();
	}, []);
	return (
		<AppLayout pageAction={<BackButton />} pageTitle='View Event'>
			<ViewEventLayout event={eventDetails} />
		</AppLayout>
	);
}

export default ViewEvent;
