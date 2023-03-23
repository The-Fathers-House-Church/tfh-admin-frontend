import React from 'react';
import { Link } from 'react-router-dom';
import { TFCCType } from '../../../types/types';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';

function CenterCard({
  center,
  openCenterDeleteModal,
}: {
  center: TFCCType;
  openCenterDeleteModal: (center: TFCCType) => void;
}) {
  return (
    <Card className={`min-w-full shadow mb-5`}>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row flex-wrap gap-2 justify-between item-center'>
          <span className='font-bold'>Cell Leader</span>
          <span>{center.cellLeader}</span>
        </div>

        <div className='flex flex-row flex-wrap gap-2 justify-between item-center'>
          <span className='font-bold'>Zone</span>
          <span>{center.zone}</span>
        </div>

        <div className='flex flex-row flex-wrap gap-2 justify-between item-center'>
          <span className='font-bold'>Address</span>
          <span>{center.address}</span>
        </div>

        <div className='flex flex-row flex-wrap gap-2 justify-between item-center'>
          <span className='font-bold'>Phone number</span>
          <span>{center.phoneNumber}</span>
        </div>

        {center.updatedBy && (
          <div className='flex flex-row flex-wrap gap-2 justify-between item-center'>
            <span className='font-bold'>Edited by</span>
            <span>{center.updatedBy}</span>
          </div>
        )}
      </div>

      <div className='flex items-center justify-center gap-3 mt-10 '>
        <Link to={`/tfcc/center/edit/${center._id}`}>
          <Button className='max-w-max !h-[20px]'>Edit</Button>
        </Link>
        <Button
          className='max-w-max !h-[20px] bg-error'
          onClick={() => {
            openCenterDeleteModal(center);
          }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default CenterCard;
