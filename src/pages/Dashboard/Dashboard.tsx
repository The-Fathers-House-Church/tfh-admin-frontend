import React from 'react';
import PageHeader from '../../common/PageHeader/PageHeader';
import { sendCatchFeedback } from '../../functions/feedback';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
	closeLoadingIndicator,
	openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { getUserSession } from '../../functions/userSession';

function Dashboard() {
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		const getData = async () => {
			const currentUser = getUserSession();

			try {
				dispatch(openLoadingIndicator({ text: 'Loading' }));
			} catch (error) {
				sendCatchFeedback(error);
			}
			dispatch(closeLoadingIndicator());
		};
		getData();
	}, [dispatch]);
	return (
		<AppLayout>
			<PageHeader title='Dashboard' />
		</AppLayout>
	);
}

export default Dashboard;
