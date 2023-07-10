import Card from '../../../common/Card/Card';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../../common/LabelInput/LabelInput';
import Button from '../../../common/Button/Button';
import { appAxios } from '../../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { useAppDispatch } from '../../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../../store/slices/loadingIndicator';
import { useNavigate, useParams } from 'react-router';
import { updateUser } from '../../../store/slices/user';
import Divider from '../../../common/Divider/Divider';
import { Link } from 'react-router-dom';

function UpdatePasswordRequest() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { verificationCode } = useParams();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      verificationCode: verificationCode,
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
      verificationCode: yup.string().required('Verification code is required'),
    }),
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Updating password' }));
    try {
      const response = await appAxios.post('/admin/reset-password/update', {
        email: formik.values.email,
        newPassword: formik.values.password,
        verificationCode: formik.values.verificationCode,
      });
      sendFeedback(response.data?.message, 'success');

      navigate('/login');
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };

  return (
    <div className='w-full flex items-center justify-center mt-10'>
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <h1 className='text-2xl font-bold text-center mb-10 dark:text-white'>
            Update Password
          </h1>
          <LabelInput
            formik={formik}
            name='email'
            label='Email'
            type='email'
            className='mb-5'
          />
          <LabelInput
            formik={formik}
            name='password'
            label='Password'
            type='password'
            className='mb-5'
          />
          <LabelInput
            formik={formik}
            name='verificationCode'
            label='Verification code'
            className='mb-10'
          />
          <Button type='submit'>Update Password</Button>
        </form>
        <Divider
          style={{
            marginBlock: 30,
          }}
        />
        <div className='text-center'>
          <Link to='/login'>
            <span className='text-sm text-primary'>Login</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default UpdatePasswordRequest;
