import Card from '../../common/Card/Card';
import { TransactionType } from '../../../types/types';

function TransactionCard({ transaction }: { transaction: TransactionType }) {
  return (
    <Card className='min-w-full shadow'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-2'>
            <span className='font-bold'>Date:</span>
            <span>{new Date(transaction.createdAt).toDateString()}</span>
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Reference:</span>
          <span className='capitalize'>{transaction.reference}</span>
        </div>
        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Interaction media:</span>
          <span className='capitalize'>{transaction.source}</span>
        </div>
        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Registered on:</span>
          <span className='capitalize'>
            {new Date(transaction.createdAt).toDateString()}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default TransactionCard;
