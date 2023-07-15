import { MdAssignmentInd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { VisitorType } from '../../../types/types';
import Card from '../../common/Card/Card';
import { FiTrash2 } from 'react-icons/fi';

function VisitorCard({
  visitor,
  openDeleteModal,
}: {
  visitor: VisitorType;
  openDeleteModal: (visitor: VisitorType) => void;
}) {
  return (
    <Card className={`min-w-full shadow !rounded p-3`}>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2 justify-between item-center'>
            <span className='font-bold'>{visitor.fname + ' ' + visitor.lname}</span>
            <span className='text-xs'>{visitor.address}</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Link to={`/visitation/assign/${visitor.id}`}>
            <MdAssignmentInd />
          </Link>
          <FiTrash2
            className='text-error cursor-pointer'
            onClick={() => {
              openDeleteModal(visitor);
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default VisitorCard;
