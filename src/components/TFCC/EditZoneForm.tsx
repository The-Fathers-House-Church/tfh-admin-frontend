import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
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

function EditZoneForm({ zone }: { zone: TFCCZoneType }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();
  const [churches, setChurches] = useState<ChurchType[]>([]);

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
    churchLabel: string;
  }

  const formik = useFormik<Zone>({
    initialValues: {
      name: zone.zonal,
      church: zone.church_id,
      churchLabel: zone.church.church_label,
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
    dispatch(openLoadingIndicator({ text: 'Updating Zone' }));
    try {
      const response = await appAxios.patch(
        '/tfcc/zone/' + zone.zone_id,
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
          label: formik.values.churchLabel,
          value: formik.values.church,
        }}
        formik={formik}
        className='mb-5'
      />
      <Button type='submit' className='mt-10'>
        Update Zone
      </Button>
    </form>
  );
}

export default EditZoneForm;
