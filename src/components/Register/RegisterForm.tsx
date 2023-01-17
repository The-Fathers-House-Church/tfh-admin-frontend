import Card from '../../common/Card/Card';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../common/LabelInput/LabelInput';
import Button from '../../common/Button/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { useAppDispatch } from '../../store/hooks';
import {
	closeLoadingIndicator,
	openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { updateUser } from '../../store/slices/user';
import { useNavigate } from 'react-router';

function RegisterForm() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			phoneNumber: '',
		},
		onSubmit: () => {
			submitValues();
		},
		validationSchema: yup.object({
			firstName: yup.string().required('First name is required'),
			lastName: yup.string().required('Last name is required'),
			email: yup.string().email('Enter a valid email').required('Email is required'),
			password: yup.string().required('Password is required'),
			phoneNumber: yup
				.string()
				.required('Phone number is required')
				.min(10, 'Invalid phone number')
				.max(12, 'Invalid phone number'),
		}),
	});

	const submitValues = async () => {
		dispatch(openLoadingIndicator({ text: 'Signing you up' }));
		try {
			const response = await appAxios.post('/auth/register', {
				email: formik.values.email,
				password: formik.values.password,
				first_name: formik.values.firstName,
				last_name: formik.values.lastName,
				phone_number: formik.values.phoneNumber,
			});

			sendFeedback(response.data?.status, 'success');
			const userObject = {
				...response.data?.data?.user,
				token: response.data?.data?.jwt,
			};
			dispatch(updateUser({ user: userObject }));
			navigate('/dashboard');
		} catch (error: any) {
			sendCatchFeedback(error);
		}
		dispatch(closeLoadingIndicator());
	};

	return (
		<div className='w-full flex items-center justify-center '>
			<Card>
				<form onSubmit={formik.handleSubmit}>
					<h1 className='text-2xl font-bold text-center mb-10 dark:text-white'>
						Register
					</h1>
					<LabelInput
						formik={formik}
						name='firstName'
						label='First Name'
						className='mb-5'
					/>
					<LabelInput
						formik={formik}
						name='lastName'
						label='Last Name'
						className='mb-5'
					/>
					<LabelInput
						formik={formik}
						name='email'
						label='Email'
						type='email'
						className='mb-5'
					/>
					<LabelInput
						formik={formik}
						name='password'
						label='Password'
						type='password'
						className='mb-5'
					/>
					<LabelInput
						formik={formik}
						name='phoneNumber'
						label='Phone number'
						className='mb-10'
						type='tel'
					/>
					<Button type='submit'>Register</Button>
				</form>
			</Card>
		</div>
	);
}

export default RegisterForm;
