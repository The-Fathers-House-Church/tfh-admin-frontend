import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { getUserSession } from '../../functions/userSession';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import AppLayout from '../../layout/AppLayout';
import BackButton from '../../common/Button/BackButton';
import LabelInput from '../../common/LabelInput/LabelInput';
import Button from '../../common/Button/Button';
import Dropdown from '../../common/Dropdown/Dropdown';

const AddVisitor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();

  interface Visitor {
    fname: string;
    lname: string;
    address: string;
    nearest: string;
    marital: string;
    gender: string;
    phone: string;
    email: string;
    contact_mode: string;
    service_opinion: string;
    suggestions: string;
    membership: string;
    dated: string;
    timerValue: string;
    category: string;
  }

  const formik = useFormik<Visitor>({
    initialValues: {
      fname: '',
      lname: '',
      address: '',
      nearest: '',
      marital: '',
      gender: '',
      phone: '',
      email: '',
      contact_mode: '',
      service_opinion: '',
      suggestions: '',
      membership: '',
      dated: '',
      timerValue: '',
      category: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      fname: yup.string().required('Required'),
      lname: yup.string().required('Required'),
      address: yup.string().required('Required'),
      nearest: yup.string().required('Required'),
      marital: yup
        .string()
        .required('Required')
        .oneOf(
          ['Married', 'Single', 'Widowed', 'Divorced', 'Engaged'],
          'Marital status is either Married, Single, Widowed, Engaged or Divorced'
        ),
      gender: yup
        .string()
        .required('Required')
        .oneOf(['Male', 'Female'], 'Gender is either Male or Female'),
      phone: yup.string().required('Required'),
      dated: yup.string().required('Required'),
      timerValue: yup
        .string()
        .required('Required')
        .oneOf(['first', 'second'], 'Timer type is either first or second'),
      category: yup
        .string()
        .required('Required')
        .oneOf(
          ['Main Church', 'Youth Church', 'Teens Church', 'Children Church'],
          'Church category is either Main Church, Youth Church, Teens Church or Children Church'
        ),
    }),
  });

  const submitValues = async () => {
    try {
      dispatch(openLoadingIndicator({ text: 'Adding Visitor' }));
      const response = await appAxios.post(
        '/visitor',
        {
          fname: formik.values.fname,
          lname: formik.values.lname,
          address: formik.values.address,
          nearest: formik.values.nearest,
          marital: formik.values.marital,
          gender: formik.values.gender,
          phone: formik.values.phone,
          email: formik.values.email,
          contact_mode: formik.values.contact_mode,
          service_opinion: formik.values.service_opinion,
          suggestions: formik.values.suggestions,
          membership: formik.values.membership,
          dated: formik.values.dated,
          timerValue: formik.values.timerValue,
          category: formik.values.category,
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      navigate('/visitation/all');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      dispatch(closeLoadingIndicator());
    }
  };
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Add Visitor'>
      <form onSubmit={formik.handleSubmit}>
        <LabelInput formik={formik} name='fname' label='First Name' className='mb-5' />
        <LabelInput formik={formik} name='lname' label='Last Name' className='mb-5' />
        <LabelInput formik={formik} name='address' label='Address' className='mb-5' />
        <LabelInput
          formik={formik}
          name='nearest'
          label='Nearest Bus-stop'
          className='mb-5'
        />
        <Dropdown
          values={['Married', 'Single', 'Widowed', 'Divorced', 'Engaged'].map((item) => ({
            label: item,
            value: item,
          }))}
          label='Marital Status'
          name='marital'
          placeholder='Select Marital Status'
          formik={formik}
          className='mb-5'
        />
        <Dropdown
          values={['Male', 'Female'].map((item) => ({
            label: item,
            value: item,
          }))}
          label='Gender'
          name='gender'
          placeholder='Select Gender'
          formik={formik}
          className='mb-5'
        />
        <LabelInput
          formik={formik}
          name='phone'
          label='Phone number'
          className='mb-5'
          type='tel'
        />
        <LabelInput
          formik={formik}
          name='email'
          label='Email Address'
          className='mb-5'
          type='email'
        />
        <Dropdown
          values={[
            'Spirit Led',
            'Relatives',
            'Church Member',
            'Friends',
            'Billboard/Flyer',
          ].map((item) => ({
            label: item,
            value: item,
          }))}
          label='How did they know about TFH'
          name='contact_mode'
          placeholder='Mode of Contact'
          formik={formik}
          className='mb-5'
        />
        <Dropdown
          values={['Excellent', 'Good', 'Fair', 'Poor'].map((item) => ({
            label: item,
            value: item,
          }))}
          label='How did they rate the service in TFH'
          name='service_opinion'
          placeholder='Service Opinion'
          formik={formik}
          className='mb-5'
        />
        <LabelInput
          formik={formik}
          name='suggestions'
          label='Suggestions'
          className='mb-5'
        />
        <LabelInput
          formik={formik}
          name='dated'
          label='Date of Visit'
          className='mb-5'
          type='date'
        />
        <Dropdown
          values={['Main Church', 'Youth Church', 'Teens Church', 'Children Church'].map(
            (item) => ({
              label: item,
              value: item,
            })
          )}
          label='Church Category'
          name='category'
          placeholder='Where did the visitor visit'
          formik={formik}
          className='mb-5'
        />
        <Dropdown
          values={[
            { value: 'first', label: 'First Timer' },
            { value: 'second', label: 'Second Timer' },
          ].map((item) => ({
            label: item.label,
            value: item.value,
          }))}
          label='Visitor Type'
          name='timerValue'
          placeholder='How many times has the visiter come'
          formik={formik}
          className='mb-5'
        />
        <Dropdown
          values={[
            { value: 'Yes', label: 'Yes, joining' },
            { value: 'No', label: 'No, not joining' },
            { value: 'Not Sure', label: 'Not Sure' },
          ].map((item) => ({
            label: item.label,
            value: item.value,
          }))}
          label='Membership Decision'
          name='membership'
          placeholder='Plan to join TFH'
          formik={formik}
          className='mb-5'
        />
        <Button type='submit' className='mt-10'>
          Save Visitor
        </Button>
      </form>
    </AppLayout>
  );
};

export default AddVisitor;
