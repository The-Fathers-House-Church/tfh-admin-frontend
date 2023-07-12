import React, { useState } from 'react';
import BackButton from '../../../common/Button/BackButton';
import AppLayout from '../../../layout/AppLayout';
import { useAppDispatch } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { DepartmentType } from '../../../../types/types';
import { getUserSession } from '../../../functions/userSession';
import { appAxios } from '../../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../../store/slices/loadingIndicator';
import LabelInput from '../../../common/LabelInput/LabelInput';
import Dropdown from '../../../common/Dropdown/Dropdown';
import Button from '../../../common/Button/Button';
import TextArea from '../../../common/TextArea/TextArea';

const AddBranch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();

  interface Branch {
    name: string;
    location: string;
    address: string;
    contact_phone: string;
    contact_email: string;
  }

  const formik = useFormik<Branch>({
    initialValues: {
      name: '',
      location: '',
      address: '',
      contact_phone: '',
      contact_email: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Required'),
      location: yup.string().required('Required'),
      address: yup.string().required('Required'),
      contact_phone: yup.string().required('Required'),
      contact_email: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Adding Branch' }));
    try {
      const response = await appAxios.post(
        '/church',
        {
          church_label: formik.values.name,
          location: formik.values.location,
          address: formik.values.address,
          contact_phone: formik.values.contact_phone,
          contact_email: formik.values.contact_email,
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      navigate('/church/branches');
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Add Church Branch'>
      <form onSubmit={formik.handleSubmit}>
        <LabelInput formik={formik} name='name' label='Branch Name' className='mb-5' />
        <LabelInput
          formik={formik}
          name='location'
          label='Branch Location'
          className='mb-5'
        />
        <TextArea
          formik={formik}
          name='address'
          label='Branch Address'
          className='mb-5'
        />
        <LabelInput
          formik={formik}
          name='contact_phone'
          label='Branch Phone Number'
          type='tel'
          className='mb-5'
        />
        <LabelInput
          formik={formik}
          name='contact_email'
          label='Branch Email'
          type='email'
          className='mb-5'
        />

        <Button type='submit' className='mt-10'>
          Save Branch
        </Button>
      </form>
    </AppLayout>
  );
};

export default AddBranch;
