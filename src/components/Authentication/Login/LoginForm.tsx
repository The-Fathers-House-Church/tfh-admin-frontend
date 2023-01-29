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
import { useNavigate } from 'react-router';
import { updateUser } from '../../../store/slices/user';
import Divider from '../../../common/Divider/Divider';
import { Link } from 'react-router-dom';

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Signing in' }));
    try {
      const response = await appAxios.post('/admin/login', {
        email: formik.values.email,
        password: formik.values.password,
      });
      sendFeedback(response.data?.message, 'success');
      const userObject = {
        ...response.data?.user,
        token: response.data?.token,
      };
      dispatch(updateUser({ user: userObject }));
      navigate('/dashboard');
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };

  return (
    <div className='w-full flex items-center justify-center '>
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <h1 className='text-2xl font-bold text-center mb-10 dark:text-white'>Login</h1>
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
            className='mb-10'
          />
          <Button type='submit'>Login</Button>
        </form>
        <Divider
          style={{
            marginBlock: 30,
          }}
        />
        <div className='text-center'>
          <Link to='/reset-password'>
            <span className='text-sm text-primary'>Reset Password</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginForm;
