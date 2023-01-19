import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { EventType } from '../../types';
import DeleteEventModal from './DeleteEventModal';

const EventItem = ({
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

function ViewEventLayout({ event }: { event: EventType | undefined }) {
	const navigate = useNavigate();

	// delete modal
	const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
	const openDeleteModal = () => {
		setDeleteModalOpen(true);
	};
	const closeDeleteModal = () => {
		setDeleteModalOpen(false);
	};

	if (!event) return <>Event not found</>;

	return (
		<div>
			<article className='flex flex-col gap-5'>
				<EventItem title='Date:' content={new Date(event.date).toDateString()} />
				<EventItem title='Title:' content={event.title} />
				<EventItem title='Main Text:' content={event.mainText} />
				<EventItem title='Text:' content={event.text} />
				<EventItem title='Content:' content={event.content} />

				<EventItem title='Confession:' content={event.confession} />
				<EventItem title='Further Reading:' multipleContent={event.furtherReading} />
				<EventItem
					title='One year Bible reading:'
					multipleContent={event.oneYearBibleReading}
					joinMultipleContent
				/>
				<EventItem
					title='Two years Bible reading:'
					multipleContent={event.twoYearsBibleReading}
					joinMultipleContent
				/>
			</article>

			<div className='flex items-center justify-center gap-5 mt-10'>
				<Link to={`/event/edit/${event._id}`} className='w-[200px]'>
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

			<DeleteEventModal
				closeDeleteModal={closeDeleteModal}
				deleteModalOpen={deleteModalOpen}
				event={event}
				navigateFunction={() => navigate('/event')}
			/>
		</div>
	);
}

export default ViewEventLayout;
