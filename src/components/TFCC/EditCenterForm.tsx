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
import { TFCCType, TFCCZoneType } from '../../../types/types';

function EditCenterForm({ center }: { center: TFCCType }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();
  const [zones, setZones] = React.useState<TFCCZoneType[] | undefined>([]);

  React.useEffect(() => {
    const getZones = async () => {
      try {
        const response = await appAxios.get(`/tfcc/zone`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setZones(response.data.data);
      } catch (error) {
        setZones([]);
        sendCatchFeedback(error);
      }
    };
    getZones();
  }, []);

  interface Center {
    cellLeader: string;
    phoneNumber: string;
    zone: string;
    address: string;
  }

  const formik = useFormik<Center>({
    initialValues: {
      cellLeader: center.cellLeader,
      phoneNumber: center.phoneNumber,
      zone: center.zone,
      address: center.address,
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      cellLeader: yup.string().required('Cell leader is required'),
      phoneNumber: yup.string().required('Phone number is required'),
      zone: yup.string().required('Zone is required'),
      address: yup.string().required('Address is required'),
    }),
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Updating Center' }));
    try {
      const response = await appAxios.patch(
        '/tfcc/center/' + center._id,
        {
          cellLeader: formik.values.cellLeader,
          phoneNumber: formik.values.phoneNumber,
          zone: formik.values.zone,
          address: formik.values.address,
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
      <Dropdown
        values={
          zones
            ? zones?.map((zone) => ({
                label: zone.name,
                value: zone.name,
              }))
            : [{ label: '', value: '' }]
        }
        label='Zone'
        name='zone'
        defaultValue={{
          label: formik.values.zone,
          value: formik.values.zone,
        }}
        placeholder='Select TFCC Zone'
        formik={formik}
        className='mb-5'
      />

      <LabelInput
        formik={formik}
        name='cellLeader'
        label='Cell Leader'
        className='mb-5'
      />
      <LabelInput
        formik={formik}
        name='phoneNumber'
        label='Phone number'
        className='mb-5'
        type='phoneNumber'
      />
      <TextArea formik={formik} name='address' label='Address' className='mb-5' />

      <Button type='submit' className='mt-10'>
        Update Center
      </Button>
    </form>
  );
}

export default EditCenterForm;
