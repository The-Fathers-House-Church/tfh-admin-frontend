import Card from '../../common/Card/Card';
import { UserType } from '../../types';

function UserCard({ user }: { user: UserType }) {
  return (
    <Card className='min-w-full shadow'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-2'>
            <span className='font-bold'>Date:</span>
            <span>{new Date(user.createdAt).toDateString()}</span>
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Name:</span>
          <span className='capitalize'>{user.firstName + ' ' + user.lastName}</span>
        </div>
        <div className='flex flex-row gap-2 flex-wrap'>
          <span className='font-bold'>Email:</span>
          <span className='capitalize'>{user.email}</span>
        </div>
        <div className='flex flex-row gap-2 flex-wrap'>
          <span className='font-bold'>Phone number:</span>
          <span className='capitalize'>{user.phoneNumber}</span>
        </div>

        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Created from:</span>
          <span className='capitalize'>{user.source}</span>
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
