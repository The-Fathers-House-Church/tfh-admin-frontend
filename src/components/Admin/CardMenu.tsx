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
	openDeactivateModal: (admin: AdminType) => void;
	openActivateModal: (admin: AdminType) => void;
	openSuperModal: (admin: AdminType) => void;
}) {
	return (
		<nav
			className='rounded absolute right-0 top-6 bg-primaryAccent1 w-40 z-10'
			style={{ boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.1)' }}
		>
			<ul className='flex flex-col'>
				<li className='p-2 hover:bg-lightDark hover:text-white text-sm cursor-pointer flex items-center gap-2' onClick={()=>openSuperModal(admin)}>
					<FiShield />
					Make super admin
				</li>
				{!admin?.active && (
					<li className='p-2 hover:bg-lightDark hover:text-white text-sm cursor-pointer flex items-center gap-2 text-success' onClick={()=>openActivateModal(admin)}>
						<FiUserCheck />
						Activate
					</li>
				)}
				{admin?.active && (
					<li className='p-2 hover:bg-lightDark hover:text-white text-sm cursor-pointer flex items-center gap-2 text-error' onClick={()=>openDeactivateModal(admin)}>
						<FiUserX />
						Deactivate
					</li>
				)}
			</ul>
		</nav>
	);
}

export default CardMenu;
