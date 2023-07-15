import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AssignedVisitorType } from '../../../types/types';
import Card from '../../common/Card/Card';

function AssignedVisitorCard({
  visitor,
  openDeleteModal,
}: {
  visitor: AssignedVisitorType;
  openDeleteModal: (visitor: AssignedVisitorType) => void;
}) {
  return (
    <Card className={`min-w-full shadow !rounded p-3`}>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2 justify-between item-center'>
            <span className='font-bold'>{visitor.names}</span>
            <span className='text-xs'>{visitor.address}</span>
            <span className='text-xs'>Assigned to: {visitor.assigned}</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
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

export default AssignedVisitorCard;
