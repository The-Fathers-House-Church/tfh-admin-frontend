import React from 'react';
import { FiShield, FiUserCheck, FiUserX } from 'react-icons/fi';
import { AdminType } from '../../types';

function CardMenu({
	admin = null,
	openDeactivateModal,
	openActivateModal,
	openSuperModal,
}: {
	admin: AdminType | null;
	openDeactivateModal: (admin: AdminType | null) => void;
	openActivateModal: (admin: AdminType | null) => void;
	openSuperModal: (admin: AdminType | null) => void;
}) {
	return (
		<nav
			className='rounded absolute right-0 top-6 bg-white shadow-md w-40 z-10'
			style={{ boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.1)' }}
		>
			<ul className='flex flex-col'>
				<li
					className='p-2 hover:bg-lightDark hover:text-white text-sm cursor-pointer flex items-center gap-2 duration-500'
					onClick={() => openSuperModal(admin)}
				>
					<FiShield />
					Make super admin
				</li>
				{!admin?.active && (
					<li
						className='p-2 hover:bg-lightDark hover:text-white text-sm cursor-pointer flex items-center gap-2 text-success duration-500'
						onClick={() => openActivateModal(admin)}
					>
						<FiUserCheck />
						Activate
					</li>
				)}
				{admin?.active && (
					<li
						className='p-2 hover:bg-lightDark hover:text-white text-sm cursor-pointer flex items-center gap-2 text-error duration-500'
						onClick={() => openDeactivateModal(admin)}
					>
						<FiUserX />
						Deactivate
					</li>
				)}
			</ul>
		</nav>
	);
}

export default CardMenu;
