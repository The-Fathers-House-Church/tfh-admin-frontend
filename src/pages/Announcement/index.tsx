import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import SectionHeader from '../../common/SectionHeader';
import AllAnnouncements from '../../components/Announcement/AllAnnouncements';
import AppLayout from '../../layout/AppLayout';

function Announcements() {
  return (
    <AppLayout
      pageTitle='Announcements'
      pageAction={
        <Link to='/announcement/new'>
          <Button className='max-w-[156px] !h-[40px] !p-4'>
            <FiPlus className='mr-3' />
            Add New
          </Button>
        </Link>
      }
    >
      <SectionHeader title='ALL ANNOUNCEMENTS' />
      <AllAnnouncements />
    </AppLayout>
  );
}

export default Announcements;
