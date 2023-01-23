import React from 'react';
import { appAxios } from '../../api/axios';
import Loader from '../../common/Loader/Loader';
import Pagination from '../../common/Pagination';
import SectionHeader from '../../common/SectionHeader';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import { AdminType } from '../../types';
import DeactivateAdminModal from './DeactivateAdminModal';
import AdminCard from './AdminCard';

function AllAdmins() {
	const [loading, setLoading] = React.useState(false);

	const [admins, setAdmins] = React.useState<AdminType[] | undefined>([]);

	const [totalResults, setTotalResults] = React.useState(0);

	const [page, setPage] = React.useState(1);

	const currentUser = getUserSession();

	const [selectedAdmin, setSelectedAdmin] = React.useState<AdminType | undefined>(
		undefined
	);

	React.useEffect(() => {
		const getAllAdmins = async () => {
			try {
				setLoading(true);

				const response = await appAxios.get(`/admin?page=${page}`, {
					headers: {
						Authorization: currentUser ? currentUser?.token : null,
					},
				});

				setAdmins(response.data.data?.results);
				setTotalResults(response.data.data?.pagination?.totalResults);

				setLoading(false);
			} catch (error) {
				setAdmins([]);
				sendCatchFeedback(error);

				setLoading(false);
			}
		};
		getAllAdmins();
	}, [page]);

	// deactivate modal
	const [deactivateModalOpen, setDeactivateModalOpen] = React.useState(false);
	const openDeactivateModal = (admin: AdminType) => {
		setSelectedAdmin(admin);
		setDeactivateModalOpen(true);
	};
	const closeDeactivateModal = () => {
		setDeactivateModalOpen(false);
	};

	return (
		<div className='mt-10'>
			{loading ? (
				<Loader />
			) : admins && admins?.length > 0 ? (
				<>
					<div className='flex flex-col gap-5'>
						{admins?.map((admin) => (
							<AdminCard
								key={admin._id}
								admin={admin}
								openDeactivateModal={openDeactivateModal}
								openSuperModal={openDeactivateModal}
								openActivateModal={openDeactivateModal}
							/>
						))}
					</div>
					<Pagination page={page} totalResults={totalResults} setPage={setPage} />
				</>
			) : (
				<span className='text-md'>No admin found</span>
			)}

			<DeactivateAdminModal
				closeDeactivateModal={closeDeactivateModal}
				deactivateModalOpen={deactivateModalOpen}
				admin={selectedAdmin}
				setAllAdmins={setAdmins}
				allAdmins={admins}
			/>
		</div>
	);
}

export default AllAdmins;
