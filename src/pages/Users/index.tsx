import React, { useEffect, useState } from 'react';
import { appAxios } from '../../api/axios';
import PageHeader from '../../common/PageHeader/PageHeader';
import Pagination from '../../common/Pagination';
import UsersList from '../../components/Users/UsersList';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	closeLoadingIndicator,
	openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { UserType } from '../../types';

function Users() {
	const [users, setUsers] = useState<UserType[]>([]);
	const dispatch = useAppDispatch();
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);
	const { limit } = useAppSelector((state) => state.pageLimit);

	useEffect(() => {
		const getUsers = async () => {
			const currentUser = getUserSession();

			dispatch(openLoadingIndicator({ text: 'Fetching Users' }));
			try {
				const response = await appAxios.get(`/users?page=${page}&take=${limit}`, {
					headers: {
						Authorization: currentUser ? 'Bearer ' + currentUser?.token?.token : null,
					},
				});
				setUsers(response.data?.data?.users?.data);
				setTotalResults(response.data?.data?.users?.meta?.itemCount);
			} catch (error) {
				sendCatchFeedback(error);
			}
			dispatch(closeLoadingIndicator());
		};
		getUsers();
	}, [dispatch, page, limit]);

	const nextPage = async () => {
		setPage(page + 1);
	};
	const previousPage = async () => {
		setPage(page - 1);
	};

	return (
		<AppLayout>
			<span>Users</span>
			{/* <UsersList users={users} />
			{users.length > 0 && (
				<Pagination
					page={page}
					totalResults={totalResults}
					nextPageChange={nextPage}
					previousPageChange={previousPage}
				/>
			)} */}
		</AppLayout>
	);
}

export default Users;
