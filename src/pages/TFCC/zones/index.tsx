import React from 'react';
import AppLayout from '../../../layout/AppLayout';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';
import BackButton from '../../../common/Button/BackButton';
import DeleteZoneModal from '../../../components/TFCC/DeleteZoneModal';
import Loader from '../../../common/Loader/Loader';
import ZoneCard from '../../../components/TFCC/ZoneCard';
import { appAxios } from '../../../api/axios';
import { getUserSession } from '../../../functions/userSession';
import { TFCCZoneType } from '../../../../types/types';
import { sendCatchFeedback } from '../../../functions/feedback';

const TFCCZones = () => {
  const [zoneLoading, setZoneLoading] = React.useState(false);
  const currentUser = getUserSession();

  const [zones, setZones] = React.useState<TFCCZoneType[] | undefined>([]);
  // delete modal
  const [selectedZone, setSelectedZone] = React.useState<TFCCZoneType | undefined>(
    undefined
  );
  const [zoneDeleteModalOpen, setZoneDeleteModalOpen] = React.useState(false);
  const openZoneDeleteModal = (zone: TFCCZoneType) => {
    setSelectedZone(zone);
    setZoneDeleteModalOpen(true);
  };
  const closeZoneDeleteModal = () => {
    setZoneDeleteModalOpen(false);
  };

  React.useEffect(() => {
    const getZones = async () => {
      try {
        setZoneLoading(true);

        const response = await appAxios.get(`/tfcc/zone`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setZones(response.data.data);

        setZoneLoading(false);
      } catch (error) {
        setZones([]);
        sendCatchFeedback(error);

        setZoneLoading(false);
      }
    };
    getZones();
  }, []);
  return (
    <AppLayout
      pageTitle='TFCC Zones'
      pageAction={
        <div className='flex gap-2'>
          <BackButton />
          <Link to='/tfcc/zone/new'>
            <Button className='!max-w-fit !w-[120px] !h-[40px] !p-4 bg-secondary'>
              Add Zone
            </Button>
          </Link>
        </div>
      }
    >
      {zoneLoading ? (
        <Loader />
      ) : zones && zones.length > 0 ? (
        zones.map((zone) => (
          <ZoneCard
            zone={zone}
            key={zone.zone_id}
            openZoneDeleteModal={openZoneDeleteModal}
          />
        ))
      ) : (
        <span className='text-md'>No zone found</span>
      )}
      <DeleteZoneModal
        allZones={zones}
        setAllZones={setZones}
        closeDeleteModal={closeZoneDeleteModal}
        deleteModalOpen={zoneDeleteModalOpen}
        zone={selectedZone}
      />
    </AppLayout>
  );
};

export default TFCCZones;
