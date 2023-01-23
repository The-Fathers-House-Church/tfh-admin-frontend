import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import SectionHeader from '../../common/SectionHeader';
import AllAdmins from '../../components/Admin/AllAdmins';
import AppLayout from '../../layout/AppLayout';

function Admins() {
	return (
		<AppLayout
			pageAction={
				<Link to='/admin/new'>
					<Button className='max-w-[156px] !h-[40px] !p-4'>
						<FiPlus className='mr-3' />
						Add New
					</Button>
				</Link>
			}
		>
			<SectionHeader title='ALL ADMINS' />
			<AllAdmins />
		</AppLayout>
	);
}

export default Admins;
