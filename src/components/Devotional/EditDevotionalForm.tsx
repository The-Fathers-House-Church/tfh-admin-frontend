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
import { DevotionalType } from '../../../types/types';
import TextEditor from '../../common/TextEditor';

function EditDevotionalForm({ devotional }: { devotional: DevotionalType | undefined }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();

  interface Devotional {
    date: Date | string | undefined;
    title: string | undefined;
    text: string | undefined;
    textReference: string | undefined;
    mainText: string | undefined;
    content: string | undefined;
  }

  const formik = useFormik<Devotional>({
    initialValues: {
      date: devotional?.ditto
        ? new Date(devotional?.ditto).toISOString().split('T')[0]
        : undefined,
      title: devotional?.titles,
      text: devotional?.scripture1,
      textReference: devotional?.scripture2,
      mainText: devotional?.main_text,
      content: devotional?.contents,
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      date: yup.string().required('Required'),
      title: yup.string().required('Required'),
      text: yup.string().required('Required'),
      textReference: yup.string().required('Required'),
      mainText: yup.string().required('Required'),
      content: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Adding Devotional' }));
    try {
      const response = await appAxios.patch(
        '/devotional',
        {
          id: devotional?.dish_id,
          date: formik.values.date,
          title: formik.values.title,
          text: formik.values.text,
          textReference: formik.values.textReference,
          mainText: formik.values.mainText,
          content: formik.values.content,
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      navigate('/devotional/view/' + response.data.devotional?.dish_id);
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
      <LabelInput
        formik={formik}
        name='textReference'
        label='Text Reference'
        className='mb-5'
      />
      <LabelInput formik={formik} name='mainText' label='Main Text' className='mb-5' />
      <TextEditor
        placeholder='Devotional Content'
        label='Content'
        containerClass='mb-5'
        name='content'
        updateState={(value) => formik.setFieldValue('content', value)}
        value={devotional?.contents}
      />

      <Button type='submit'>Update Devotional</Button>
    </form>
  );
}

export default EditDevotionalForm;
