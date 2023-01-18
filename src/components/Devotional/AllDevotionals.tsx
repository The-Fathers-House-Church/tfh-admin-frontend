import React from 'react';
import { appAxios } from '../../api/axios';
import Loader from '../../common/Loader/Loader';
import Pagination from '../../common/Pagination';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import { DevotionalType } from '../../types';
import DevotionalCard from './DevotionalCard';

function AllDevotionals() {
	const [loading, setLoading] = React.useState(false);

	const [devotionals, setDevotionals] = React.useState<DevotionalType[]>([]);

	const [totalResults, setTotalResults] = React.useState(0);

	const [page, setPage] = React.useState(1);

	const currentUser = getUserSession();

	React.useEffect(() => {
		const getAllDevotionals = async () => {
			try {
				setLoading(true);

				const response = await appAxios.get(`/devotional?page=${page}`, {
					headers: {
						Authorization: currentUser ? currentUser?.token : null,
					},
				});

				setDevotionals(response.data.data?.results);
				setTotalResults(response.data.data?.pagination?.totalResults);

				setLoading(false);
			} catch (error) {
				setDevotionals([]);
				sendCatchFeedback(error);

				setLoading(false);
			}
		};
		getAllDevotionals();
	}, [page]);

	return (
		<>
			<div className='flex items-center justify-center mt-10 p-5 mb-5 bg-primaryAccent2 md:w-1/4'>
				<h3 className='font-bold'>ALL DEVOTIONALS</h3>
			</div>
			{loading ? (
				<Loader />
			) : devotionals?.length > 0 ? (
				<>
					<div className='flex flex-col gap-5'>
						{devotionals.map((devotional) => (
							<DevotionalCard key={devotional._id} devotional={devotional} />
						))}
					</div>
					<Pagination page={page} totalResults={totalResults} setPage={setPage} />
				</>
			) : (
				<span className='text-md'>No devotional found</span>
			)}
		</>
	);
}

export default AllDevotionals;
