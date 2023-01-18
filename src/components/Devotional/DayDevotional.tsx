import React from 'react';
import { useNavigate } from 'react-router-dom';
import { appAxios } from '../../api/axios';
import Card from '../../common/Card/Card';
import Loader from '../../common/Loader/Loader';
import { DevotionalType } from '../../types';

function DayDevotional() {
	const [loading, setLoading] = React.useState(true);
	const [todaysDevotional, setTodaysDevotional] = React.useState<DevotionalType | null>(
		null
	);

	const navigate = useNavigate();

	React.useEffect(() => {
		const getTodaysDevotion = async () => {
			try {
				setLoading(true);

				const response = await appAxios.get('/devotional/today');
				setTodaysDevotional(response.data.devotional);

				setLoading(false);
			} catch (error) {
				setTodaysDevotional(null);
				setLoading(false);
			}
		};
		getTodaysDevotion();
	}, []);

	return (
		<Card
			className={`min-w-full shadow p-4 ${
				todaysDevotional ? 'cursor-pointer' : 'cursor-auto'
			}`}
			onClick={() =>
				todaysDevotional ? navigate('/devotional/view/' + todaysDevotional?._id) : null
			}
		>
			{loading ? (
				<Loader />
			) : (
				<article className='flex flex-col gap-5'>
					<h2>
						THE FATHER'S MENU{' '}
						{todaysDevotional && (
							<> - {new Date(todaysDevotional.date).toLocaleDateString()}</>
						)}
					</h2>
					{todaysDevotional ? (
						<>
							<span className='font-bold'>{todaysDevotional.title}</span>
							<div className='flex flex-col gap-2'>
								<span>Main Text: {todaysDevotional.mainText}</span>
								<span>Text: {todaysDevotional.text}</span>
							</div>
							<span className='line-clamp'>{todaysDevotional.content}</span>
						</>
					) : (
						<span className='text-xs'>Devotional not found</span>
					)}
				</article>
			)}
		</Card>
	);
}

export default DayDevotional;
