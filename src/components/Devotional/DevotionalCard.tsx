import { FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card/Card';
import { DevotionalType } from '../../types';

function DevotionalCard({
	devotional = null,
	openDeleteModal,
}: {
	devotional: DevotionalType | null;
	openDeleteModal: (devotional: DevotionalType) => void;
}) {
	const navigate = useNavigate();

	if (!devotional) return null;
	return (
		<Card
			className={`min-w-full p-3 shadow-sm cursor-pointer`}
			onClick={() => navigate('/devotional/view/' + devotional?._id)}
		>
			<article className='flex items-center justify-center md:justify-between flex-wrap gap-5'>
				<div className='flex items-center gap-10'>
					<span className='text-sm'>
						{new Date(devotional.date).toLocaleDateString()}
					</span>
					<span>
						{devotional.title} <span className='text-sm'>- {devotional.mainText}</span>
					</span>
				</div>
				<div className='flex items-center gap-5'>
					<FiEdit
						onClick={(e) => {
							e.stopPropagation(); // this is because the entire card is clickable
							navigate('/devotional/edit/' + devotional?._id);
						}}
					/>
					<FiTrash
						className='text-error'
						onClick={(e) => {
							e.stopPropagation();
							openDeleteModal(devotional);
						}}
					/>
				</div>
			</article>
		</Card>
	);
}

export default DevotionalCard;
