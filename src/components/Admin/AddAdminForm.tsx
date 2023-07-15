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

function AddAdminForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();

  interface Admin {
    email: '';
    password: '';
    fullname: '';
    // poster: string;
  }

  const formik = useFormik<Admin>({
    initialValues: {
      email: '',
      password: '',
      fullname: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
      fullname: yup.string().required('Full name is required'),
    }),
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Adding Admin' }));
    try {
      const response = await appAxios.post(
        '/admin',
        {
          email: formik.values.email,
          password: formik.values.password,
          fullname: formik.values.fullname,
          role: 'admin',
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      navigate('/admin');
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <LabelInput
        formik={formik}
        name='fullname'
        label="Admin's Full Name"
        className='mb-5'
      />
      <LabelInput formik={formik} name='email' label="Admin's Email" className='mb-5' />
      <LabelInput
        formik={formik}
        name='password'
        label="Admins' Password"
        className='mb-5'
        type='password'
      />

      <Button type='submit' className='mt-10'>
        Save Admin
      </Button>
    </form>
  );
}

export default AddAdminForm;
