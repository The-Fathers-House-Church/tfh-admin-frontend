import { FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card/Card';
import { EventType } from '../../types';

function EventCard({
	event = null,
	openDeleteModal,
}: {
	event: EventType | null;
	openDeleteModal: (event: EventType) => void;
}) {
	const navigate = useNavigate();

	if (!event) return null;
	return (
		<Card
			className={`min-w-full p-3 shadow-sm cursor-pointer`}
			onClick={() => navigate('/event/view/' + event?._id)}
		>
			<article className='flex items-center justify-center md:justify-between flex-wrap gap-5'>
				<div className='flex items-center gap-10'>
					<span className='text-sm'>{new Date(event.date).toLocaleDateString()}</span>
					<span>
						{event.title} <span className='text-sm'>- {event.mainText}</span>
					</span>
				</div>
				<div className='flex items-center gap-5'>
					<FiEdit
						onClick={(e) => {
							e.stopPropagation(); // this is because the entire card is clickable
							navigate('/event/edit/' + event?._id);
						}}
					/>
					<FiTrash
						className='text-error'
						onClick={(e) => {
							e.stopPropagation();
							openDeleteModal(event);
						}}
					/>
				</div>
			</article>
		</Card>
	);
}

export default EventCard;
