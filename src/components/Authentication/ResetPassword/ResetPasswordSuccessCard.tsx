import Card from '../../../common/Card/Card';
import { useAppDispatch } from '../../../store/hooks';
import { useNavigate } from 'react-router';
import SuccessGif from '../../../assets/gifs/success.gif';

function ResetPasswordSuccessCard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className='w-full flex items-center justify-center '>
      <Card className='w-full'>
        <div className='flex items-center flex-col mb-5'>
          <img src={SuccessGif} alt='Success' />
        </div>
        <h1 className='text-2xl font-bold text-center mb-5 dark:text-white'>
          Request Successful
        </h1>
        <p className='text-center'>
          Your request to reset your password was successful. We've sent your verification
          code and password update link to your email. Check your email for further
          instructions.
        </p>
      </Card>
    </div>
  );
}

export default ResetPasswordSuccessCard;
