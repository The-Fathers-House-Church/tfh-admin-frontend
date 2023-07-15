import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { TFCCLeaderType } from '../../../types/types';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';

function LeaderCard({
  leader,
  openLeaderDeleteModal,
}: {
  leader: TFCCLeaderType;
  openLeaderDeleteModal: (leader: TFCCLeaderType) => void;
}) {
  return (
    <Card className={`min-w-full shadow !rounded mb-3 p-3`}>
      <div className='flex items-center justify-between flex-wrap gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2 justify-between item-center'>
            <span className='font-bold'>{leader.firstname + ' ' + leader.lastname}</span>
            <span className='text-xs'>Role: {leader.role}</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Link to={`/tfcc/leader/edit/${leader.id}`}>
            <FiEdit />
          </Link>
          <FiTrash2
            className='text-error cursor-pointer'
            onClick={() => {
              openLeaderDeleteModal(leader);
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default LeaderCard;
