import { useFormik } from 'formik';
import React, { useState } from 'react';
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
import { ChurchType, TFCCZoneType } from '../../../types/types';

function AddZoneForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [churches, setChurches] = useState<ChurchType[]>([]);
  const currentUser = getUserSession();

  React.useEffect(() => {
    const getChurches = async () => {
      try {
        const response = await appAxios.get(`/church`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setChurches(response.data.data);
      } catch (error) {
        setChurches([]);
        sendCatchFeedback(error);
      }
    };
    getChurches();
  }, []);

  interface Zone {
    name: string;
    church: string;
  }

  const formik = useFormik<Zone>({
    initialValues: {
      name: '',
      church: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      church: yup.string().required('Church is required'),
    }),
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Adding Zone' }));
    try {
      const response = await appAxios.post(
        '/tfcc/zone',
        {
          name: formik.values.name,
          church_id: formik.values.church,
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      navigate('/tfcc/zone');
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <LabelInput formik={formik} name='name' label='Name' className='mb-5' />
      <Dropdown
        values={
          churches && churches.length
            ? churches.map((church) => ({
                label: church.church_label,
                value: church.church_id,
              }))
            : [{ label: '', value: '' }]
        }
        label='Church Branch'
        name='church'
        defaultValue={{
          label: formik.values.church,
          value: formik.values.church,
        }}
        formik={formik}
        className='mb-5'
      />
      <Button type='submit' className='mt-10'>
        Save Zone
      </Button>
    </form>
  );
}

export default AddZoneForm;
