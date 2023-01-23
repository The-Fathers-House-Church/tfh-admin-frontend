import { useFormik } from 'formik';
import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import * as yup from 'yup';
import {
	closeLoadingIndicator,
	openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { useNavigate } from 'react-router-dom';
import LabelInput from '../../common/LabelInput/LabelInput';
import Button from '../../common/Button/Button';
import TextArea from '../../common/TextArea/TextArea';
import { getUserSession } from '../../functions/userSession';
import { AdminType } from '../../types';
import Dropdown from '../../common/Dropdown/Dropdown';

function EditAdminForm({ admin }: { admin: AdminType | undefined }) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const currentUser = getUserSession();

	interface Admin {
		name: string | undefined;
		theme: string | undefined;
		mainText: string | undefined;
		date: Date | string | undefined;
		time: string | undefined;
		allowRegistration: boolean | undefined;
		limitedNumberRegistration: boolean | undefined;
		registrationNumberLimit: number | undefined;
		limitedDateRegistration: boolean | undefined;
		registrationDateLimit: string | undefined;
		// poster: string;
	}

	const formik = useFormik<Admin>({
		initialValues: {
			name: admin?.name,
			time: admin?.time,
			mainText: admin?.mainText,
			theme: admin?.theme,
			allowRegistration: admin?.allowRegistration,
			limitedDateRegistration: admin?.limitedDateRegistration,
			limitedNumberRegistration: admin?.limitedNumberRegistration,
			registrationDateLimit: admin?.registrationDateLimit
				? new Date(admin?.registrationDateLimit).toISOString().split('T')[0]
				: undefined,
			registrationNumberLimit: admin?.registrationNumberLimit,
			date: admin?.date ? new Date(admin?.date).toISOString().split('T')[0] : undefined,
		},
		onSubmit: () => {
			submitValues();
		},
		validationSchema: yup.object({
			date: yup.string().required('Required'),
			allowRegistration: yup.boolean().required('Required'),
			limitedDateRegistration: yup.boolean().required('Required'),
			limitedNumberRegistration: yup.boolean().required('Required'),
			name: yup.string().required('Required'),
			time: yup.string().required('Required'),
		}),
		enableReinitialize: true,
	});

	const submitValues = async () => {
		dispatch(openLoadingIndicator({ text: 'Adding Admin' }));
		try {
			const response = await appAxios.patch(
				'/admin',
				{
					date: formik.values.date,
					allowRegistration: formik.values.allowRegistration,
					limitedDateRegistration: formik.values.limitedDateRegistration,
					limitedNumberRegistration: formik.values.limitedNumberRegistration,
					mainText: formik.values.mainText,
					name: formik.values.name,
					registrationDateLimit: formik.values.registrationDateLimit,
					registrationNumberLimit: formik.values.registrationNumberLimit,
					theme: formik.values.theme,
					time: formik.values.time,
				},
				{
					headers: {
						Authorization: currentUser ? currentUser?.token : null,
					},
				}
			);
			sendFeedback(response.data?.message, 'success');

			navigate('/admin/view/' + response.data.admin?._id);
		} catch (error) {
			sendCatchFeedback(error);
		}
		dispatch(closeLoadingIndicator());
	};

	if (!admin) return <>Admin not found</>;

	return (
		<form onSubmit={formik.handleSubmit}>
			<LabelInput formik={formik} name='name' label='Admin name' className='mb-5' />
			<LabelInput formik={formik} name='date' label='Date' className='mb-5' type='date' />
			<LabelInput
				formik={formik}
				name='time'
				label='Time'
				hint='Add all the schedules for the admin'
				className='mb-5'
			/>
			<LabelInput formik={formik} name='theme' label='Theme' className='mb-5' />
			<LabelInput
				formik={formik}
				name='mainText'
				label='Main Bible Text'
				className='mb-5'
			/>
			<Dropdown
				values={[
					{
						label: 'Yes',
						value: true,
					},
					{
						label: 'No',
						value: false,
					},
				]}
				label='Allow Registration'
				name='allowRegistration'
				defaultValue={{
					label: formik.values.allowRegistration ? 'Yes' : 'No',
					value: formik.values.allowRegistration,
				}}
				formik={formik}
				className='mb-5'
			/>
			{formik.values.allowRegistration && (
				<Dropdown
					values={[
						{
							label: 'Yes',
							value: true,
						},
						{
							label: 'No',
							value: false,
						},
					]}
					label='Registration is limited by date'
					name='limitedDateRegistration'
					defaultValue={{
						label: formik.values.limitedDateRegistration ? 'Yes' : 'No',
						value: formik.values.limitedDateRegistration,
					}}
					formik={formik}
					className='mb-5'
				/>
			)}

			{/* When the registration is limited by date */}
			{formik.values.limitedDateRegistration && (
				<LabelInput
					formik={formik}
					name='registrationDateLimit'
					label='Date Limit'
					className='mb-5'
					type='date'
				/>
			)}

			{formik.values.allowRegistration && (
				<Dropdown
					values={[
						{
							label: 'Yes',
							value: true,
						},
						{
							label: 'No',
							value: false,
						},
					]}
					label='Registration is limited by number'
					name='limitedNumberRegistration'
					defaultValue={{
						label: formik.values.limitedNumberRegistration ? 'Yes' : 'No',
						value: formik.values.limitedNumberRegistration,
					}}
					formik={formik}
					className='mb-5'
				/>
			)}

			{/* When the registration is limited by date */}
			{formik.values.limitedNumberRegistration && (
				<LabelInput
					formik={formik}
					name='registrationNumberLimit'
					label='Number Limit'
					className='mb-5'
					type='number'
				/>
			)}
			<Button type='submit' className='mt-10'>
				Update Admin
			</Button>
		</form>
	);
}

export default EditAdminForm;
