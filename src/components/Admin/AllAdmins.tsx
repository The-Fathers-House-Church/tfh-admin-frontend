import React from 'react';
import { appAxios } from '../../api/axios';
import Loader from '../../common/Loader/Loader';
import Pagination from '../../common/Pagination';
import SectionHeader from '../../common/SectionHeader';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import { AdminType } from '../../types';
import DeleteAdminModal from './DeleteAdminModal';
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

	// delete modal
	const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
	const openDeleteModal = (admin: AdminType) => {
		setSelectedAdmin(admin);
		setDeleteModalOpen(true);
	};
	const closeDeleteModal = () => {
		setDeleteModalOpen(false);
	};

	return (
		<div className='mt-10'>
			{loading ? (
				<Loader />
			) : admins && admins?.length > 0 ? (
				<>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
						{admins?.map((admin) => (
							<AdminCard
								key={admin._id}
								admin={admin}
								openDeleteModal={openDeleteModal}
							/>
						))}
					</div>
					<Pagination page={page} totalResults={totalResults} setPage={setPage} />
				</>
			) : (
				<span className='text-md'>No admin found</span>
			)}

			<DeleteAdminModal
				closeDeleteModal={closeDeleteModal}
				deleteModalOpen={deleteModalOpen}
				admin={selectedAdmin}
				setAllAdmins={setAdmins}
				allAdmins={admins}
			/>
		</div>
	);
}

export default AllAdmins;
