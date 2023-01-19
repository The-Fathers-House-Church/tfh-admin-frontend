import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import SectionHeader from '../../common/SectionHeader';
import AllEvents from '../../components/Event/AllEvents';
import AppLayout from '../../layout/AppLayout';

function Events() {
	return (
		<AppLayout
			pageAction={
				<Link to='/event/new'>
					<Button className='max-w-[156px] !h-[40px] !p-4'>
						<FiPlus className='mr-3' />
						Add New
					</Button>
				</Link>
			}
		>
			<SectionHeader title='ALL EVENTS' />
			<AllEvents />
		</AppLayout>
	);
}

export default Events;
