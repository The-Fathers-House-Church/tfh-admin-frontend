import React from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../api/axios';
import BackButton from '../../common/Button/BackButton';
import EditAdminForm from '../../components/Admin/EditAdminForm';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
	closeLoadingIndicator,
	openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { AdminType } from '../../types';

function EditAdmin() {
	const [adminDetails, setAdminDetails] = React.useState<AdminType | undefined>(
		undefined
	);
	const { id } = useParams();
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		const getAdmin = async () => {
			dispatch(openLoadingIndicator({ text: 'Retrieving Admin' }));

			try {
				const response = await appAxios.get('/admin/' + id);
				setAdminDetails(response.data.admin);
			} catch (error) {
				setAdminDetails(undefined);
			}
			dispatch(closeLoadingIndicator());
		};
		getAdmin();
	}, []);

	return (
		<AppLayout pageAction={<BackButton />} pageTitle='Edit Admin'>
			<EditAdminForm admin={adminDetails} />
		</AppLayout>
	);
}

export default EditAdmin;
