import Card from '../../common/Card/Card';
import { UserType } from '../../types';

function UserCard({ user }: { user: UserType }) {
  return (
    <Card className='min-w-full shadow'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Name:</span>
          <span className='capitalize'>{user.firstName + ' ' + user.lastName}</span>
        </div>
        <div className='flex flex-row gap-2 flex-wrap'>
          <span className='font-bold'>Email:</span>
          <span>{user.email}</span>
        </div>
        <div className='flex flex-row gap-2 flex-wrap'>
          <span className='font-bold'>Phone number:</span>
          <span className='capitalize'>{user.phoneNumber}</span>
        </div>

        <div className='flex flex-row gap-2 flex-wrap'>
          <span className='font-bold'>Church Center:</span>
          <span className='capitalize'>{user.churchCenter}</span>
        </div>
        <div className='flex flex-row gap-2 flex-wrap'>
          <span className='font-bold'>Member:</span>
          <span className='capitalize'>{user.member ? 'Yes' : 'No'}</span>
        </div>

        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Registered from:</span>
          <span className='capitalize'>{user.registrationSource}</span>
        </div>
        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Registered on:</span>
          <span className='capitalize'>{new Date(user.createdAt).toDateString()}</span>
        </div>
      </div>
    </Card>
  );
}

export default UserCard;
