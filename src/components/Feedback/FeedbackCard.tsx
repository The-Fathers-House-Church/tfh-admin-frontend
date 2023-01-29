import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { FiMoreVertical } from 'react-icons/fi';
import Card from '../../common/Card/Card';
import { FeedbackType } from '../../types';
import CardMenu from './CardMenu';

function FeedbackCard({
  feedback,
  changeFeedbackStatus,
}: {
  feedback: FeedbackType;
  changeFeedbackStatus: (feedback: FeedbackType, newStatus: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Card className='min-w-full shadow'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-2'>
            <span className='font-bold'>Date:</span>
            <span>{new Date(feedback.createdAt).toDateString()}</span>
          </div>
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
                  feedback={feedback}
                  changeFeedbackStatus={changeFeedbackStatus}
                />
              )}
            </div>
          </ClickAwayListener>
        </div>
        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Name:</span>
          <span className='capitalize'>{feedback.fullName}</span>
        </div>
        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Email:</span>
          <span className='capitalize'>{feedback.email}</span>
        </div>
        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Phone number:</span>
          <span className='capitalize'>{feedback.phoneNumber}</span>
        </div>
        <div className='flex flex-row gap-2 flex-wrap'>
          <span className='font-bold'>Feedback:</span>
          <span className='capitalize'>{feedback.content}</span>
        </div>
        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Status:</span>
          <span className='capitalize text-gray-800'>{feedback.status}</span>
        </div>
        <div className='flex flex-row gap-2'>
          <span className='font-bold'>Interaction Channel:</span>
          <span className='capitalize'>{feedback.source}</span>
        </div>
      </div>
    </Card>
  );
}

export default FeedbackCard;
