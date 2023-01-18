import React from 'react';
import Button from '../../common/Button/Button';
import AppLayout from '../../layout/AppLayout';
import { FiPlus } from 'react-icons/fi';
import DayDevotional from '../../components/Devotional/DayDevotional';
import AllDevotionals from '../../components/Devotional/AllDevotionals';
import { Link } from 'react-router-dom';

function Devotional() {
	return (
		<AppLayout
			pageAction={
				<Link to='/devotional/new'>
					<Button className='max-w-[156px] !h-[40px] !p-4'>
						<FiPlus className='mr-3' />
						Add New
					</Button>
				</Link>
			}
		>
			<DayDevotional />
			<AllDevotionals />
		</AppLayout>
	);
}

export default Devotional;
