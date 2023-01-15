import React from 'react';
import Card from '../../common/Card/Card';
import { UserType } from '../../types';

function UserCard({ user }: { user: UserType }) {
	return (
		<Card className='min-w-full w-full'>
			<div className='flex flex-col gap-5 text-sm dark:text-white'>
				<div className='flex flex-row items-center flex-wrap justify-between'>
					<b>Name</b>
					<span>
						{user.first_name} {user.last_name}
					</span>
				</div>
				<div className='flex flex-row items-center flex-wrap justify-between'>
					<b>Email</b>
					<span>{user.email}</span>
				</div>
				<div className='flex flex-row items-center flex-wrap justify-between'>
					<b>Phone</b>
					<span>{user.phone_number}</span>
				</div>
				<div className='flex flex-row items-center flex-wrap justify-between'>
					<b>Joined</b>
					<span>{new Date(user.created_at).toDateString()}</span>
				</div>
			</div>
		</Card>
	);
}

export default UserCard;
