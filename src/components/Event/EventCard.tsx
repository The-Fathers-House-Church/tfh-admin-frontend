import { FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card/Card';
import { EventType } from '../../types';
import DefaultImage from '../../assets/images/default.jpg';

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
			className={`min-w-full p-0 shadow-sm cursor-pointer bg-primaryAccent2`}
			onClick={() => navigate('/event/view/' + event?._id)}
		>
			<article>
				<img
					src={event.poster || DefaultImage}
					alt='Poster'
					className='object-cover h-36 w-full rounded-t-lg'
				/>
				<div className='flex flex-col flex-wrap gap-2 p-5'>
					<span className='font-bold text-lg'>{event.name}</span>
					<div className='flex items-center gap-1'>
						<span className='text-sm'>Date: </span>
						<span className='text-sm'>{new Date(event.date).toDateString()}</span>
					</div>
					<div className='flex items-center gap-1'>
						<span className='text-sm'>Theme: </span>
						<span className='text-sm'>{event.theme}</span>
					</div>
					<div className='flex items-center gap-1'>
						<span className='text-sm'>Allows Registration: </span>
						<span className='text-sm'>{event.allowRegistration ? 'Yes' : 'No'}</span>
					</div>
					<div className='flex items-center justify-center mt-5 gap-5'>
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
				</div>
			</article>
		</Card>
	);
}

export default EventCard;
