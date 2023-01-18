import React from 'react';
import Button from '../../common/Button/Button';
import AppLayout from '../../layout/AppLayout';
import { FiPlus } from 'react-icons/fi';
import DayDevotional from '../../components/Devotional/DayDevotional';

function Devotional() {
	return (
		<AppLayout
			pageAction={
				<Button className='max-w-[156px] !h-[40px] !p-4'>
					<FiPlus className='mr-3' />
					Add New
				</Button>
			}
		>
			<DayDevotional />
		</AppLayout>
	);
}

export default Devotional;
