import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BulletinSubscriberType } from '../../../types/types';
import Card from '../../common/Card/Card';
import Button from '../../common/Button/Button';

function BulletinCard({
  subscriber,
  openDeleteModal,
  openEditModal,
}: {
  subscriber: BulletinSubscriberType;
  openEditModal: (subscriber: BulletinSubscriberType) => void;
  openDeleteModal: (subscriber: BulletinSubscriberType) => void;
}) {
  return (
    <Card className={`min-w-full shadow !rounded p-3`}>
      <div className='flex items-center justify-between flex-wrap gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2 justify-between item-center'>
            <span className='font-bold'>{subscriber.address}</span>
            <span className={subscriber.subscribed ? 'text-success' : 'text-error'}>
              {subscriber.subscribed ? 'Subscribed' : 'Unsubscribed'}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <button onClick={() => openEditModal(subscriber)}>
            <FiEdit />
          </button>
          <FiTrash2
            className='text-error cursor-pointer'
            onClick={() => {
              openDeleteModal(subscriber);
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default BulletinCard;
