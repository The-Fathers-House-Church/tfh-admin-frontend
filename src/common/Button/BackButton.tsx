import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function BackButton() {
	const navigate = useNavigate();
	return (
		<Button
			onClick={() => navigate(-1)}
			className='max-w-[126px] !h-[40px] !p-4 !bg-white border-primary border !text-primary hover:brightness-95'
		>
			<FiArrowLeft className='mr-3' />
			Back
		</Button>
	);
}

export default BackButton;
