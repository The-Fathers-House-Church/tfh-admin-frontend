import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';

interface Props {
  title: string;
  value: number;
  link?: string;
}

function StatisticsCard({ title, value, link }: Props) {
  return (
    <Card className='shadow min-w-full p-4'>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-3'>
          <span className='text-gray-700 text-sm'>{title}</span>
          <span className='font-bold text-lg'>{value || 0}</span>
        </div>
        {link && (
          <Link to={link} className='text-blue-700 text-xs'>
            View more
          </Link>
        )}
      </div>
    </Card>
  );
}

export default StatisticsCard;
