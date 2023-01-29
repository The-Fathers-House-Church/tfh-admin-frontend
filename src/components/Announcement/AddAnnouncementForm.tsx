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
import RequiredRegistrationDetails from './RequiredRegistrationDetails';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { RegistrationDetailType } from '../../types';

function AddAnnouncementForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();

  interface Announcement {
    name: string;
    theme: string;
    mainText: string;
    date: string;
    time: string;
    allowRegistration: boolean;
    limitedNumberRegistration: boolean;
    registrationNumberLimit: number;
    limitedDateRegistration: boolean;
    registrationDateLimit: string;
    poster: string;
  }

  const formik = useFormik<Announcement>({
    initialValues: {
      name: '',
      date: '',
      time: '',
      mainText: '',
      theme: '',
      allowRegistration: false,
      limitedDateRegistration: false,
      limitedNumberRegistration: false,
      registrationDateLimit: '',
      registrationNumberLimit: 0,
      poster: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      date: yup.string().required('Required'),
      allowRegistration: yup.boolean().required('Required'),
      limitedDateRegistration: yup.boolean().required('Required'),
      limitedNumberRegistration: yup.boolean().required('Required'),
      name: yup.string().required('Required'),
      time: yup.string().required('Required'),
      poster: yup.string().required('Required'),
    }),
  });

  const randomID = React.useMemo(() => uuidv4(), []);

  const [registrationDetails, setRegistrationDetails] =
    React.useState<RegistrationDetailType>({
      [randomID]: {
        id: randomID,
        name: '',
        type: 'text',
      },
    });

  const submitValues = async () => {
    // Check for poster upload error
    if (!formik.values.poster) {
      return sendFeedback('Select a poster image', 'error');
    }

    // Check for registration detail error
    let registrationDetailError = Object.values(registrationDetails)?.find(
      (detail) => !detail.name || !detail.type
    );

    if (registrationDetailError && formik.values.allowRegistration) {
      return sendFeedback(
        'Name and type is required for each registration detail',
        'error'
      );
    }

    const formData = new FormData();
    formData.append('poster', formik.values.poster);
    formData.append('name', formik.values.name);
    formData.append('theme', formik.values.theme);
    formData.append('mainText', formik.values.mainText);
    formData.append('date', formik.values.date);
    formData.append('time', formik.values.time);
    formData.append('allowRegistration', formik.values.allowRegistration ? '1' : '0'); // allowed way to specify true and false in formdata
    formData.append(
      'limitedNumberRegistration',
      formik.values.limitedNumberRegistration ? '1' : '0'
    );
    formData.append(
      'registrationNumberLimit',
      formik.values.registrationNumberLimit?.toString()
    );
    formData.append(
      'limitedDateRegistration',
      formik.values.limitedDateRegistration ? '1' : '0'
    );
    formik.values.allowRegistration &&
      formData.append(
        'requiredRegistrationDetails',
        JSON.stringify(Object.values(registrationDetails))
      );

    dispatch(openLoadingIndicator({ text: 'Adding Announcement' }));

    try {
      const response = await appAxios.post('/announcement', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: currentUser ? currentUser?.token : null,
        },
      });
      sendFeedback(response.data?.message, 'success');

      navigate('/announcement/view/' + response.data.announcement?._id);
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <LabelInput
        formik={formik}
        name='name'
        label='Announcement name'
        className='mb-5'
      />
      <LabelInput formik={formik} name='date' label='Date' className='mb-5' type='date' />
      <LabelInput
        formik={formik}
        name='time'
        label='Time'
        hint='Add all the schedules for the announcement'
        className='mb-5'
      />
      <LabelInput formik={formik} name='theme' label='Theme' className='mb-5' />
      <div className='flex flex-col gap-2 mb-5'>
        <label htmlFor='poster'>Announcement Poster</label>
        <input
          type='file'
          name='poster'
          id='poster'
          className='border-lightGrey border-2'
          accept='image/*'
          required
          onChange={(e: any) => {
            const file = e.target.files[0];
            formik.setFieldValue('poster', file);
          }}
        />
      </div>
      <LabelInput
        formik={formik}
        name='mainText'
        label='Main Bible Text'
        className='mb-5'
      />
      <Dropdown
        values={[
          {
            label: 'Yes',
            value: true,
          },
          {
            label: 'No',
            value: false,
          },
        ]}
        label='Allow Registration'
        name='allowRegistration'
        defaultValue={{
          label: formik.values.allowRegistration ? 'Yes' : 'No',
          value: formik.values.allowRegistration,
        }}
        formik={formik}
        className='mb-5'
      />
      {formik.values.allowRegistration && (
        <RequiredRegistrationDetails
          registrationDetails={registrationDetails}
          setRegistrationDetails={setRegistrationDetails}
        />
      )}
      {formik.values.allowRegistration && (
        <Dropdown
          values={[
            {
              label: 'Yes',
              value: true,
            },
            {
              label: 'No',
              value: false,
            },
          ]}
          label='Registration is limited by date'
          name='limitedDateRegistration'
          defaultValue={{
            label: formik.values.limitedDateRegistration ? 'Yes' : 'No',
            value: formik.values.limitedDateRegistration,
          }}
          formik={formik}
          className='mb-5'
        />
      )}

      {/* When the registration is limited by date */}
      {formik.values.limitedDateRegistration && (
        <LabelInput
          formik={formik}
          name='registrationDateLimit'
          label='Date Limit'
          className='mb-5'
          type='date'
        />
      )}

      {formik.values.allowRegistration && (
        <Dropdown
          values={[
            {
              label: 'Yes',
              value: true,
            },
            {
              label: 'No',
              value: false,
            },
          ]}
          label='Registration is limited by number'
          name='limitedNumberRegistration'
          defaultValue={{
            label: formik.values.limitedNumberRegistration ? 'Yes' : 'No',
            value: formik.values.limitedNumberRegistration,
          }}
          formik={formik}
          className='mb-5'
        />
      )}

      {/* When the registration is limited by date */}
      {formik.values.limitedNumberRegistration && (
        <LabelInput
          formik={formik}
          name='registrationNumberLimit'
          label='Number Limit'
          className='mb-5'
          type='number'
        />
      )}

      <Button type='submit' className='mt-10'>
        Save Announcement
      </Button>
    </form>
  );
}

export default AddAnnouncementForm;
