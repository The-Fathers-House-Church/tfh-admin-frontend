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
import { getUserSession } from '../../functions/userSession';
import Dropdown from '../../common/Dropdown/Dropdown';
import TextArea from '../../common/TextArea/TextArea';
import { TFCCZoneType } from '../../../types/types';

function AddZoneForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();

  interface Zone {
    name: string;
  }

  const formik = useFormik<Zone>({
    initialValues: {
      name: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
    }),
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Adding Zone' }));
    try {
      const response = await appAxios.post(
        '/tfcc/zone',
        {
          name: formik.values.name,
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      navigate('/tfcc');
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <LabelInput formik={formik} name='name' label='Name' className='mb-5' />

      <Button type='submit' className='mt-10'>
        Save Zone
      </Button>
    </form>
  );
}

export default AddZoneForm;
