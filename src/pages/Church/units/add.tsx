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

const AddUnit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const currentUser = getUserSession();

  React.useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await appAxios.get(`/department`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setDepartments(response.data.data);
      } catch (error) {
        setDepartments([]);
        sendCatchFeedback(error);
      }
    };
    getDepartments();
  }, []);

  interface Unit {
    name: string;
    department: string;
  }

  const formik = useFormik<Unit>({
    initialValues: {
      name: '',
      department: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      department: yup.string().required('Church is required'),
    }),
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Adding Unit' }));
    try {
      const response = await appAxios.post(
        '/unit',
        {
          u_names: formik.values.name,
          dept_id: formik.values.department,
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      navigate('/church/units');
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };
  return (
    <AppLayout pageAction={<BackButton />} pageTitle='Add Church Unit'>
      <form onSubmit={formik.handleSubmit}>
        <LabelInput formik={formik} name='name' label='Unit Name' className='mb-5' />
        <Dropdown
          values={
            departments && departments.length
              ? departments.map((department) => ({
                  label: department.names,
                  value: department.id,
                }))
              : [{ label: '', value: '' }]
          }
          label='Department'
          name='department'
          defaultValue={{
            label: formik.values.department,
            value: formik.values.department,
          }}
          formik={formik}
          className='mb-5'
        />
        <Button type='submit' className='mt-10'>
          Save Unit
        </Button>
      </form>
    </AppLayout>
  );
};

export default AddUnit;
