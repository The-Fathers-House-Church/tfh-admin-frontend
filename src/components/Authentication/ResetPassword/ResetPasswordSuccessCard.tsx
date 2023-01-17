import Card from '../../../common/Card/Card';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../../common/LabelInput/LabelInput';
import Button from '../../../common/Button/Button';
import { appAxios } from '../../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { useAppDispatch } from '../../../store/hooks';
import {
	closeLoadingIndicator,
	openLoadingIndicator,
} from '../../../store/slices/loadingIndicator';
import { useNavigate } from 'react-router';
import { updateUser } from '../../../store/slices/user';
import Divider from '../../../common/Divider/Divider';
import { Link } from 'react-router-dom';
import SuccessGif from '../../../assets/gifs/success.gif';

function ResetPasswordSuccessCard() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return (
		<div className='w-full flex items-center justify-center '>
			<Card className='w-full'>
				<div className='flex items-center flex-col mb-5'>
					<img src={SuccessGif} alt='Success' />
				</div>
				<h1 className='text-2xl font-bold text-center mb-5 dark:text-white'>
					Request Successful
				</h1>
				<p className='text-center'>
					Your request to reset your password was successful. We've sent your verification
					code and password update link to your email. Check your email for further
					instructions.
				</p>
			</Card>
		</div>
	);
}

export default ResetPasswordSuccessCard;
