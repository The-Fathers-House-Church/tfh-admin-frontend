import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { DevotionalType } from '../../types';
import DeleteDevotionalModal from './DeleteDevotionalModal';

const DevotionalItem = ({
	title,
	content,
	multipleContent,
	joinMultipleContent,
}: {
	title: string;
	content?: string;
	multipleContent?: string[];
	joinMultipleContent?: boolean;
}) => (
	<>
		<div className={'flex items-start flex-wrap gap-3'}>
			<span className='font-bold'>{title}</span>
			{content && <span>{content}</span>}
			{multipleContent && !joinMultipleContent ? (
				<div className='flex flex-col gap-2'>
					{multipleContent.map((content) => (
						<span>{content}</span>
					))}
				</div>
			) : (
				<span>{multipleContent?.join(' , ')}</span>
			)}
		</div>
	</>
);

function ViewDevotionalLayout({
	devotional,
}: {
	devotional: DevotionalType | undefined;
}) {
	const navigate = useNavigate();

	// delete modal
	const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
	const openDeleteModal = () => {
		setDeleteModalOpen(true);
	};
	const closeDeleteModal = () => {
		setDeleteModalOpen(false);
	};

	if (!devotional) return <>Devotional not found</>;

	return (
		<div>
			<article className='flex flex-col gap-5'>
				<DevotionalItem
					title='Date:'
					content={new Date(devotional.date).toDateString()}
				/>
				<DevotionalItem title='Title:' content={devotional.title} />
				<DevotionalItem title='Main Text:' content={devotional.mainText} />
				<DevotionalItem title='Text:' content={devotional.text} />
				<DevotionalItem title='Content:' content={devotional.content} />

				<DevotionalItem title='Confession:' content={devotional.confession} />
				<DevotionalItem
					title='Further Reading:'
					multipleContent={devotional.furtherReading}
				/>
				<DevotionalItem
					title='One year Bible reading:'
					multipleContent={devotional.oneYearBibleReading}
					joinMultipleContent
				/>
				<DevotionalItem
					title='Two years Bible reading:'
					multipleContent={devotional.twoYearsBibleReading}
					joinMultipleContent
				/>
			</article>

			<div className='flex items-center justify-center gap-5 mt-10'>
				<Link to={`/devotional/edit/${devotional._id}`} className='w-[200px]'>
					<Button>
						<FiEdit className='mr-5' />
						Edit
					</Button>
				</Link>
				<Button className='max-w-[200px] bg-error' onClick={openDeleteModal}>
					<FiTrash className='mr-5' />
					Delete
				</Button>
			</div>

			<DeleteDevotionalModal
				closeDeleteModal={closeDeleteModal}
				deleteModalOpen={deleteModalOpen}
				devotional={devotional}
				navigateFunction={() => navigate('/devotional')}
			/>
		</div>
	);
}

export default ViewDevotionalLayout;
