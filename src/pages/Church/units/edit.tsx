import React, { useState } from 'react';
import BackButton from '../../../common/Button/BackButton';
import AppLayout from '../../../layout/AppLayout';
import { useAppDispatch } from '../../../store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { DepartmentType, UnitType } from '../../../../types/types';
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

const EditUnit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [unit, setUnit] = useState<UnitType | undefined>(undefined);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const currentUser = getUserSession();

  React.useEffect(() => {
    const getUnit = async () => {
      try {
        const response = await appAxios.get(`/unit/view/${id}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setUnit(response.data.unit);
      } catch (error) {
        setUnit(undefined);
        sendCatchFeedback(error);
      }
    };
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
    getUnit();
    getDepartments();
  }, []);

  interface Unit {
    name: string;
    department: string;
    departmentLabel: string;
  }

  const formik = useFormik<Unit>({
    initialValues: {
      name: unit?.u_names || '',
      department: unit?.dept_id || '',
      departmentLabel: unit?.department.names || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      department: yup.string().required('Department is required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Updating Unit' }));
    try {
      const response = await appAxios.put(
        `/unit/${id}`,
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
    <AppLayout pageAction={<BackButton />} pageTitle='Edit Church Unit'>
      {unit && formik.values.name ? (
        <form onSubmit={formik.handleSubmit}>
          <LabelInput formik={formik} name='name' label='Unit Name' className='mb-5' />
          <Dropdown
            values={
              departments && departments.length
                ? departments.map((department) => ({
                    label: department.names,
                    value: department.id,
                    key: department.id,
                  }))
                : [{ label: '', value: '' }]
            }
            label='Department'
            name='department'
            defaultValue={{
              label: formik.values.departmentLabel,
              value: formik.values.department,
            }}
            formik={formik}
            className='mb-5'
          />

          <Button type='submit' className='mt-10'>
            Update Unit
          </Button>
        </form>
      ) : (
        <span className='text-sm'>Unit not found</span>
      )}
    </AppLayout>
  );
};

export default EditUnit;
