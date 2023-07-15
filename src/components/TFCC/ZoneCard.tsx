import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { TFCCZoneType } from '../../../types/types';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';

function ZoneCard({
  zone,
  openZoneDeleteModal,
}: {
  zone: TFCCZoneType;
  openZoneDeleteModal: (zone: TFCCZoneType) => void;
}) {
  return (
    <Card className={`min-w-full shadow !rounded mb-3 p-3`}>
      <div className='flex items-center justify-between flex-wrap gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2 justify-between item-center'>
            <span className='font-bold'>{zone.zonal}</span>
            <span className='text-xs'>Church: {zone.church.church_label}</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Link to={`/tfcc/zone/edit/${zone.zone_id}`}>
            <FiEdit />
          </Link>
          <FiTrash2
            className='text-error cursor-pointer'
            onClick={() => {
              openZoneDeleteModal(zone);
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default ZoneCard;
