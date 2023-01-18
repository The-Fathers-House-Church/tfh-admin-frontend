import React from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../api/axios';
import BackButton from '../../common/Button/BackButton';
import ViewDevotionalLayout from '../../components/Devotional/ViewDevotionalLayout';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
	closeLoadingIndicator,
	openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { DevotionalType } from '../../types';

function ViewDevotional() {
	const [devotionalDetails, setDevotionalDetails] = React.useState<DevotionalType | null>(
		null
	);
	const { id } = useParams();
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		const getTodaysDevotion = async () => {
			dispatch(openLoadingIndicator({ text: 'Retrieving Devotional' }));

			try {
				const response = await appAxios.get('/devotional/view/' + id);
				setDevotionalDetails(response.data.devotional);
			} catch (error) {
				setDevotionalDetails(null);
			}
			dispatch(closeLoadingIndicator());
		};
		getTodaysDevotion();
	}, []);
	return (
		<AppLayout pageAction={<BackButton />} pageTitle='View Devotional'>
			<ViewDevotionalLayout devotional={devotionalDetails} />
		</AppLayout>
	);
}

export default ViewDevotional;
