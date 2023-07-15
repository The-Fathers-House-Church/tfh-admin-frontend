import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ChurchType } from '../../../types/types';
import Card from '../../common/Card/Card';

function BranchCard({
  branch,
  openDeleteModal,
}: {
  branch: ChurchType;
  openDeleteModal: (branch: ChurchType) => void;
}) {
  return (
    <Card className={`min-w-full shadow !rounded p-3`}>
      <div className='flex items-center justify-between flex-wrap gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2 justify-between item-center'>
            <span className='font-bold'>{branch.church_label}</span>
            <span className='text-xs'>{branch.location}</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Link to={`/church/branches/edit/${branch.church_id}`}>
            <FiEdit />
          </Link>
          <FiTrash2
            className='text-error cursor-pointer'
            onClick={() => {
              openDeleteModal(branch);
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default BranchCard;
