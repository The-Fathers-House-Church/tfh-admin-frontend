import React from 'react';
import { Link } from 'react-router-dom';
import { TFCCCellType } from '../../../types/types';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';

function CellCard({
  cell,
  openCellDeleteModal,
}: {
  cell: TFCCCellType;
  openCellDeleteModal: (cell: TFCCCellType) => void;
}) {
  return (
    <Card className={`min-w-full shadow mb-5`}>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row flex-wrap gap-2 justify-between item-center'>
          <span className='font-bold'>Cell Leader</span>
          <span>{cell.cell_leader}</span>
        </div>

        <div className='flex flex-row flex-wrap gap-2 justify-between item-center'>
          <span className='font-bold'>Zone</span>
          <span>{cell.tfccZone.zonal}</span>
        </div>
        <div className='flex flex-row flex-wrap gap-2 justify-between item-center'>
          <span className='font-bold'>Church</span>
          <span>{cell.church.church_label}</span>
        </div>

        <div className='flex flex-row flex-wrap gap-2 justify-between item-center'>
          <span className='font-bold'>Address</span>
          <span>{cell.host_address}</span>
        </div>

        <div className='flex flex-row flex-wrap gap-2 justify-between item-center'>
          <span className='font-bold'>Phone number</span>
          <span>{cell.phone}</span>
        </div>
      </div>

      <div className='flex items-center justify-center gap-3 mt-10 '>
        <Link to={`/tfcc/cell/edit/${cell.cell_id}`}>
          <Button className='max-w-max !h-[20px]'>Edit</Button>
        </Link>
        <Button
          className='max-w-max !h-[20px] bg-error'
          onClick={() => {
            openCellDeleteModal(cell);
          }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default CellCard;
