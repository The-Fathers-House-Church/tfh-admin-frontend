import { FiMoreVertical } from 'react-icons/fi';
import Card from '../../common/Card/Card';
import { AdminType } from '../../types';
import { useState } from 'react';
import CardMenu from './CardMenu';
import ClickAwayListener from 'react-click-away-listener';
import { getUserSession } from '../../functions/userSession';

function AdminCard({
  admin = null,
  openDeactivateModal,
  openActivateModal,
  openSuperModal,
}: {
  admin: AdminType | null;
  openDeactivateModal: (admin: AdminType | null) => void;
  openActivateModal: (admin: AdminType | null) => void;
  openSuperModal: (admin: AdminType | null) => void;
}) {
  const [open, setOpen] = useState(false);

  const userDetails = getUserSession();

  if (!admin) return null;
  return (
    <Card className={`min-w-full p-3 shadow-sm `}>
      <div className='flex items-center justify-between flex-nowrap'>
        <div className='flex gap-3 items-center'>
          <div
            className='w-1 p-1 rounded-full'
            style={{
              backgroundColor: admin.active ? '#2BB62A' : '#F13637',
            }}
          />
          <span>
            {admin.fullname} - <span className='capitalize text-xs'>{admin.role}</span>
          </span>
        </div>
        {userDetails?.role === 'superAdmin' && (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div className='relative'>
              <button
                onClick={() => setOpen(true)}
                className='flex items-center relative hover:bg-primaryAccent1 pl-1 pr-1 pt-1 pb-1 rounded-sm'
              >
                <FiMoreVertical />
              </button>
              {open && (
                <CardMenu
                  admin={admin}
                  openActivateModal={openActivateModal}
                  openDeactivateModal={openDeactivateModal}
                  openSuperModal={openSuperModal}
                />
              )}
            </div>
          </ClickAwayListener>
        )}
      </div>
    </Card>
  );
}

export default AdminCard;
