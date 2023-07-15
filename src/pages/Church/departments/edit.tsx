import React, { useState } from 'react';
import BackButton from '../../../common/Button/BackButton';
import AppLayout from '../../../layout/AppLayout';
import { useAppDispatch } from '../../../store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditDepartment = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [department, setDepartment] = useState<DepartmentType | undefined>(undefined);
  const currentUser = getUserSession();

  React.useEffect(() => {
    const getDepartment = async () => {
      try {
        const response = await appAxios.get(`/department/view/${id}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setDepartment(response.data.department);
      } catch (error) {
        setDepartment(undefined);
        sendCatchFeedback(error);
      }
    };

    getDepartment();
  }, []);

  interface Department {
    names: string;
  }

  const formik = useFormik<Department>({
    initialValues: {
      names: department?.names || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      names: yup.string().required('Name is required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Updating Department' }));
    try {
      const response = await appAxios.put(
        `/department/${id}`,
        {
          names: formik.values.names,
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      navigate('/church/departments');
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Edit Church Department'>
      {department ? (
        <form onSubmit={formik.handleSubmit}>
          <LabelInput
            formik={formik}
            name='names'
            label='Department Name'
            className='mb-5'
          />

          <Button type='submit' className='mt-10'>
            Update Department
          </Button>
        </form>
      ) : (
        <span className='text-sm'>Department not found</span>
      )}
    </AppLayout>
  );
};

export default EditDepartment;
