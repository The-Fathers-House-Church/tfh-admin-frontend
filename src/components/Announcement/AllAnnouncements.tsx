import React from 'react';
import { appAxios } from '../../api/axios';
import Loader from '../../common/Loader/Loader';
import Pagination from '../../common/Pagination';
import SectionHeader from '../../common/SectionHeader';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import { AnnouncementType } from '../../../types/types';
import DeleteAnnouncementModal from './DeleteAnnouncementModal';
import AnnouncementCard from './AnnouncementCard';

function AllAnnouncements() {
  const [loading, setLoading] = React.useState(false);

  const [announcements, setAnnouncements] = React.useState<
    AnnouncementType[] | undefined
  >([]);

  const [totalResults, setTotalResults] = React.useState(0);

  const [page, setPage] = React.useState(1);

  const currentUser = getUserSession();

  const [selectedAnnouncement, setSelectedAnnouncement] = React.useState<
    AnnouncementType | undefined
  >(undefined);

  React.useEffect(() => {
    const getAllAnnouncements = async () => {
      try {
        setLoading(true);

        const response = await appAxios.get(`/announcement?page=${page}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setAnnouncements(response.data.data?.results);
        setTotalResults(response.data.data?.pagination?.totalResults);

        setLoading(false);
      } catch (error) {
        setAnnouncements([]);
        sendCatchFeedback(error);

        setLoading(false);
      }
    };
    getAllAnnouncements();
  }, [page]);

  // delete modal
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const openDeleteModal = (announcement: AnnouncementType) => {
    setSelectedAnnouncement(announcement);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className='mt-10'>
      {loading ? (
        <Loader />
      ) : announcements && announcements?.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {announcements?.map((announcement) => (
              <AnnouncementCard
                key={announcement._id}
                announcement={announcement}
                openDeleteModal={openDeleteModal}
              />
            ))}
          </div>
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </>
      ) : (
        <span className='text-md'>No announcement found</span>
      )}

      <DeleteAnnouncementModal
        closeDeleteModal={closeDeleteModal}
        deleteModalOpen={deleteModalOpen}
        announcement={selectedAnnouncement}
        setAllAnnouncements={setAnnouncements}
        allAnnouncements={announcements}
      />
    </div>
  );
}

export default AllAnnouncements;
