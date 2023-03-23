import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { TFCCType, TFCCZoneType } from '../../../types/types';
import { appAxios } from '../../api/axios';
import Button from '../../common/Button/Button';
import SectionHeader from '../../common/SectionHeader';
import DeleteCenterModal from '../../components/TFCC/DeleteCenterModal';
import DeleteZoneModal from '../../components/TFCC/DeleteZoneModal';
import TFCCList from '../../components/TFCC/TFCCList';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import AppLayout from '../../layout/AppLayout';

function TFCCCenters() {
  // TFCC Center Data
  const [centerLoading, setCenterLoading] = React.useState(false);
  const [centers, setCenters] = React.useState<TFCCType[] | undefined>([]);
  const [centerTotalResults, setCenterTotalResults] = React.useState(0);
  const [centerPage, setCenterPage] = React.useState<number>(1);
  // delete modal
  const [selectedCenter, setSelectedCenter] = React.useState<TFCCType | undefined>(
    undefined
  );
  const [centerDeleteModalOpen, setCenterDeleteModalOpen] = React.useState(false);
  const openCenterDeleteModal = (center: TFCCType) => {
    setSelectedCenter(center);
    setCenterDeleteModalOpen(true);
  };
  const closeCenterDeleteModal = () => {
    setCenterDeleteModalOpen(false);
  };

  // TFCC Zone Data
  const [zoneLoading, setZoneLoading] = React.useState(false);
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

  const currentUser = getUserSession();

  React.useEffect(() => {
    const getCenters = async () => {
      try {
        setCenterLoading(true);

        const response = await appAxios.get(`/tfcc/centers?page=${centerPage}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setCenters(response.data.data?.results);
        setCenterTotalResults(response.data.data?.pagination?.totalResults);

        setCenterLoading(false);
      } catch (error) {
        setCenters([]);
        sendCatchFeedback(error);

        setCenterLoading(false);
      }
    };
    getCenters();
  }, [centerPage]);

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
      pageTitle='TFCC'
      pageAction={
        <div className='flex gap-2'>
          <Link to='/tfcc/zone/new'>
            <Button className='max-w-max !h-[40px] !p-4 bg-secondary'>Add Zone</Button>
          </Link>
          <Link to='/tfcc/center/new'>
            <Button className='max-w-max !h-[40px] !p-4'>Add Center</Button>
          </Link>
        </div>
      }
    >
      <TFCCList
        centers={centers}
        centerLoading={centerLoading}
        centerPage={centerPage}
        setCenterPage={setCenterPage}
        centerTotalResults={centerTotalResults}
        zones={zones}
        zoneLoading={zoneLoading}
        openZoneDeleteModal={openZoneDeleteModal}
        openCenterDeleteModal={openCenterDeleteModal}
      />
      <DeleteZoneModal
        allZones={zones}
        setAllZones={setZones}
        closeDeleteModal={closeZoneDeleteModal}
        deleteModalOpen={zoneDeleteModalOpen}
        zone={selectedZone}
      />
      <DeleteCenterModal
        allCenters={centers}
        setAllCenters={setCenters}
        closeDeleteModal={closeCenterDeleteModal}
        deleteModalOpen={centerDeleteModalOpen}
        center={selectedCenter}
      />
    </AppLayout>
  );
}

export default TFCCCenters;
