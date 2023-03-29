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
import { getUserSession } from '../../functions/userSession';
import TextArea from '../../common/TextArea/TextArea';
import TextEditor from '../../common/TextEditor';

function AddAnnouncementForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();

  interface Announcement {
    title: string;
    details: string;
    priority: number;
    image: string;
  }

  const formik = useFormik<Announcement>({
    initialValues: {
      priority: 0,
      details: '',
      title: '',
      image: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      priority: yup.number().required('Required'),
      image: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    // Check for image upload error
    if (!formik.values.image) {
      return sendFeedback('Select an image', 'error');
    }

    const formData = new FormData();
    formData.append('image', formik.values.image);
    formData.append('title', formik.values.title);
    formData.append('details', formik.values.details);
    formData.append('priority', formik.values.priority.toString());

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
      <LabelInput formik={formik} name='title' label='Title' className='mb-5' />

      <LabelInput
        formik={formik}
        name='priority'
        label='Priority'
        className='mb-5'
        hint='How important is this announcement. Higher priority means more importance'
      />

      <TextEditor
        placeholder='Details'
        label='Announcement Details (optional)'
        containerClass='mb-5'
        name='details'
        updateState={(value) => formik.setFieldValue('details', value)}
        required={false}
      />

      <Button type='submit' className='mt-10'>
        Save Announcement
      </Button>
    </form>
  );
}

export default AddAnnouncementForm;
