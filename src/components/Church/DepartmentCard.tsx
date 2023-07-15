import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { DepartmentType } from '../../../types/types';
import Card from '../../common/Card/Card';

function DepartmentCard({
  department,
  openDeleteModal,
}: {
  department: DepartmentType;
  openDeleteModal: (department: DepartmentType) => void;
}) {
  return (
    <Card className={`min-w-full shadow !rounded p-3`}>
      <div className='flex items-center justify-between flex-wrap gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2 justify-between item-center'>
            <span className='font-bold'>{department.names}</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Link to={`/church/departments/edit/${department.id}`}>
            <FiEdit />
          </Link>
          <FiTrash2
            className='text-error cursor-pointer'
            onClick={() => {
              openDeleteModal(department);
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default DepartmentCard;
