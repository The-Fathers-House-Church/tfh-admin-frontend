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
import { DevotionalType } from '../../types';

function EditDevotionalForm({ devotional }: { devotional: DevotionalType | undefined }) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const currentUser = getUserSession();

	interface Devotional {
		date: Date | string | undefined;
		title: string | undefined;
		text: string | undefined;
		mainText: string | undefined;
		content: string | undefined;
		confession: string | undefined;
		furtherReading: string | undefined;
		oneYearBibleReading: string | undefined;
		twoYearsBibleReading: string | undefined;
	}

	const formik = useFormik<Devotional>({
		initialValues: {
			date: devotional?.date
				? new Date(devotional?.date).toISOString().split('T')[0]
				: undefined,
			title: devotional?.title,
			text: devotional?.text,
			mainText: devotional?.mainText,
			content: devotional?.content,
			confession: devotional?.confession,
			furtherReading: devotional?.furtherReading.join(' + '),
			oneYearBibleReading: devotional?.oneYearBibleReading.join(' + '),
			twoYearsBibleReading: devotional?.twoYearsBibleReading.join(' + '),
		},
		onSubmit: () => {
			submitValues();
		},
		validationSchema: yup.object({
			date: yup.string().required('Required'),
			title: yup.string().required('Required'),
			text: yup.string().required('Required'),
			mainText: yup.string().required('Required'),
			content: yup.string().required('Required'),
			confession: yup.string().required('Required'),
			furtherReading: yup.string().required('Required'),
			oneYearBibleReading: yup.string().required('Required'),
			twoYearsBibleReading: yup.string().required('Required'),
		}),
		enableReinitialize: true,
	});

	const submitValues = async () => {
		dispatch(openLoadingIndicator({ text: 'Adding Devotional' }));
		try {
			const response = await appAxios.patch(
				'/devotional',
				{
					id: devotional?._id,
					date: formik.values.date,
					title: formik.values.title,
					text: formik.values.text,
					mainText: formik.values.mainText,
					content: formik.values.content,
					confession: formik.values.confession,
					furtherReading: formik.values.furtherReading
						?.split('+')
						?.map((element: string) => element?.trim()),
					oneYearBibleReading: formik.values.oneYearBibleReading
						?.split('+')
						?.map((element: string) => element?.trim()),
					twoYearsBibleReading: formik.values.twoYearsBibleReading
						?.split('+')
						?.map((element: string) => element?.trim()),
				},
				{
					headers: {
						Authorization: currentUser ? currentUser?.token : null,
					},
				}
			);
			sendFeedback(response.data?.message, 'success');

			navigate('/devotional/view/' + response.data.devotional?._id);
		} catch (error) {
			sendCatchFeedback(error);
		}
		dispatch(closeLoadingIndicator());
	};

	if (!devotional) return <>Devotional not found</>;

	return (
		<form onSubmit={formik.handleSubmit}>
			<LabelInput formik={formik} name='date' label='Date' className='mb-5' type='date' />
			<LabelInput formik={formik} name='title' label='Title' className='mb-5' />
			<LabelInput formik={formik} name='text' label='Text' className='mb-5' />
			<LabelInput formik={formik} name='mainText' label='Main Text' className='mb-5' />
			<TextArea
				formik={formik}
				name='content'
				label='Content'
				className='mb-5'
				rows={5}
			/>
			<LabelInput formik={formik} name='confession' label='Confession' className='mb-5' />
			<LabelInput
				formik={formik}
				name='furtherReading'
				label='Further Reading'
				className='mb-5'
				hint='Separate items by plus(+). Example: Item 1 + Item 2'
			/>
			<LabelInput
				formik={formik}
				name='oneYearBibleReading'
				label='One Year Bible Reading'
				hint='Separate items by plus(+). Example: Item 1 + Item 2'
				className='mb-5'
			/>
			<LabelInput
				formik={formik}
				name='twoYearsBibleReading'
				label='Two Years Bible Reading'
				hint='Separate items by plus(+). Example: Item 1 + Item 2'
				className='mb-5'
			/>
			<Button type='submit'>Update Devotional</Button>
		</form>
	);
}

export default EditDevotionalForm;
