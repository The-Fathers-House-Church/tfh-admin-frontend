import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openModal } from '../../store/slices/pageLimit';
import PaginationLimitModal from './PaginationLimitModal';

export default function Pagination({
	totalResults,
	nextPageChange,
	previousPageChange,
	page,
}: {
	totalResults: number;
	nextPageChange: () => void;
	previousPageChange: () => void;
		page: number;
}) {

	const limit = useAppSelector(store => store.pageLimit.limit)

	const totalPages: number = Math.ceil(totalResults / limit);
	const dispatch = useAppDispatch();


	return (
		<>
		<div className='flex flex-col items-center mt-20'>
			<span className='text-sm text-gray-700 dark:text-gray-400'>
					Showing page{' '}
				<span className='font-semibold text-gray-900 dark:text-white'>{page}</span> of{' '}
				<span className='font-semibold text-gray-900 dark:text-white'>{totalPages}</span>{' '}
					{/* {totalPages > 1 ? 'pages' : 'page'} */}
			</span>
			<div className='inline-flex mt-2 xs:mt-0'>
				<button
					className='inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-5'
					onClick={() => previousPageChange()}
					disabled={page <= 1}
				>
					<svg
						aria-hidden='true'
						className='mr-2 w-5 h-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
								fillRule='evenodd'
							d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
								clipRule='evenodd'
						></path>
					</svg>
					Prev
				</button>
				<button
					className='inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-5'
					onClick={() => nextPageChange()}
					disabled={page >= totalPages}
				>
					Next
					<svg
						aria-hidden='true'
						className='ml-2 w-5 h-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
								fillRule='evenodd'
							d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
								clipRule='evenodd'
						></path>
					</svg>
				</button>
			</div>
				<div className='flex gap-2 items-center justify-center mt-2'>
					<span className='text-sm text-gray-700 dark:text-gray-400'>
						Total Results: {totalResults}
					</span>
					<div className='w-[1px] h-7 bg-gray-700' />
					<div className='flex items-center gap-2 flex-wrap text-sm text-gray-700 dark:text-gray-400'>
						Max results per page: {limit}
						<button
							className='underline underline-offset-2 cursor-pointer text-blue-700 dark:text-blue-300'
							onClick={() => dispatch(openModal())}>(Change)</button>
					</div>
				</div>
			</div>
			<PaginationLimitModal />
		</>
	);
}
