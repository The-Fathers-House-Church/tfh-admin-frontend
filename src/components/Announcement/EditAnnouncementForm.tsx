import { useFormik } from 'formik';
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
import TextArea from '../../common/TextArea/TextArea';
import { getUserSession } from '../../functions/userSession';
import { AnnouncementType } from '../../../types/types';
import Dropdown from '../../common/Dropdown/Dropdown';
import TextEditor from '../../common/TextEditor';

function EditAnnouncementForm({ announcement }: { announcement: AnnouncementType }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();

  interface Announcement {
    title: string;
    details: string;
    priority: number;
    image: string;
    changeImage: boolean;
  }

  const formik = useFormik<Announcement>({
    initialValues: {
      priority: announcement.priority || 0,
      details: announcement.details || '',
      title: announcement.title || '',
      changeImage: false,
      image: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      priority: yup.number().required('Required'),
      changeImage: yup.boolean().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    // Check for image upload error
    if (formik.values.changeImage && !formik.values.image) {
      return sendFeedback('Select an image', 'error');
    }

    const formData = new FormData();
    {
      formik.values.changeImage && formData.append('image', formik.values.image);
    }
    formData.append('title', formik.values.title);
    formData.append('details', formik.values.details);
    formData.append('priority', formik.values.priority.toString());

    dispatch(openLoadingIndicator({ text: 'Updating Announcement' }));
    try {
      const response = await appAxios.patch(
        '/announcement/' + announcement._id,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      navigate('/announcement/view/' + response.data.announcement._id);
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <LabelInput formik={formik} name='title' label='Title' className='mb-5' />

      <LabelInput
        formik={formik}
        name='priority'
        label='Priority'
        hint='Add all the schedules for the announcement'
        className='mb-5'
      />

      <TextEditor
        placeholder='Details'
        label='Announcement Details (optional)'
        containerClass='mb-5'
        name='details'
        updateState={(value) => formik.setFieldValue('details', value)}
        value={announcement?.details}
        required={false}
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
        label='Change Image'
        name='changeImage'
        defaultValue={{
          label: formik.values.changeImage ? 'Yes' : 'No',
          value: formik.values.changeImage,
        }}
        formik={formik}
        className='mb-5'
      />
      {formik.values.changeImage && (
        <div className='flex flex-col gap-2 mb-5'>
          <label htmlFor='image'>Announcement Image</label>
          <input
            type='file'
            name='image'
            id='image'
            className='border-lightGrey border-2'
            accept='image/*'
            required
            onChange={(e: any) => {
              const file = e.target.files[0];
              formik.setFieldValue('image', file);
            }}
          />
        </div>
      )}

      <Button type='submit' className='mt-10'>
        Update Announcement
      </Button>
    </form>
  );
}

export default EditAnnouncementForm;
