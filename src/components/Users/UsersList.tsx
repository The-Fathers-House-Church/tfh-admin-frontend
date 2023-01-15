import React from 'react';
import { UserType } from '../../types';
import UserCard from './UserCard';

function UsersList({ users }: { users: UserType[] }) {
	return (
		<div className='flex flex-col gap-10'>
			{users.length > 0 ? (
				users.map((user: UserType) => <UserCard user={user} key={user._id} />)
			) : (
				<span className='dark:text-white'>No user found</span>
			)}
		</div>
	);
}

export default UsersList;
