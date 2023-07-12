import React, { useState } from 'react';
import BackButton from '../../../common/Button/BackButton';
import AppLayout from '../../../layout/AppLayout';
import { useAppDispatch } from '../../../store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { ChurchType } from '../../../../types/types';
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
import Button from '../../../common/Button/Button';
import TextArea from '../../../common/TextArea/TextArea';

const EditBranch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [branch, setBranch] = useState<ChurchType | undefined>(undefined);
  const currentUser = getUserSession();

  React.useEffect(() => {
    const getBranch = async () => {
      try {
        const response = await appAxios.get(`/church/view/${id}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setBranch(response.data.church);
      } catch (error) {
        setBranch(undefined);
        sendCatchFeedback(error);
      }
    };

    getBranch();
  }, []);

  interface Branch {
    name: string | undefined;
    location: string | undefined;
    address: string | undefined;
    contact_phone: string | undefined;
    contact_email: string | undefined;
  }

  const formik = useFormik<Branch>({
    initialValues: {
      name: branch?.church_label || '',
      location: branch?.location || '',
      address: branch?.address || '',
      contact_phone: branch?.contact_phone || '',
      contact_email: branch?.contact_email || '',
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
    enableReinitialize: true,
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Updating Branch' }));
    try {
      const response = await appAxios.put(
        `/church/${id}`,
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
    <AppLayout pageAction={<BackButton />} pageTitle='Edit Church Branch'>
      {branch && formik.values.name ? (
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
            Update Branch
          </Button>
        </form>
      ) : (
        <span className='text-sm'>Branch not found</span>
      )}
    </AppLayout>
  );
};

export default EditBranch;
