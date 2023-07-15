import BackButton from '../../../common/Button/BackButton';
import AppLayout from '../../../layout/AppLayout';
import { useAppDispatch } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
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

const AddDepartment = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();

  interface Department {
    names: string;
  }

  const formik = useFormik<Department>({
    initialValues: {
      names: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      names: yup.string().required('Name is required'),
    }),
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Adding Department' }));
    try {
      const response = await appAxios.post(
        '/department',
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
    <AppLayout pageAction={<BackButton />} pageTitle='Add Church Department'>
      <form onSubmit={formik.handleSubmit}>
        <LabelInput
          formik={formik}
          name='names'
          label='Department Name'
          className='mb-5'
        />

        <Button type='submit' className='mt-10'>
          Save Department
        </Button>
      </form>
    </AppLayout>
  );
};

export default AddDepartment;
