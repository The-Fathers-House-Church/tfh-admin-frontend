import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { UnitType } from '../../../types/types';
import Card from '../../common/Card/Card';

function UnitCard({
  unit,
  openDeleteModal,
}: {
  unit: UnitType;
  openDeleteModal: (unit: UnitType) => void;
}) {
  return (
    <Card className={`min-w-full shadow !rounded p-3`}>
      <div className='flex items-center justify-between flex-wrap gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2 justify-between item-center'>
            <span className='font-bold'>{unit.u_names}</span>
            <span className='text-xs'>Department: {unit.department.names}</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Link to={`/church/units/edit/${unit.id}`}>
            <FiEdit />
          </Link>
          <FiTrash2
            className='text-error cursor-pointer'
            onClick={() => {
              openDeleteModal(unit);
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default UnitCard;
