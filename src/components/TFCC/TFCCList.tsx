import React from 'react';
import { TFCCType, TFCCZoneType } from '../../../types/types';
import { appAxios } from '../../api/axios';
import Loader from '../../common/Loader/Loader';
import SectionHeader from '../../common/SectionHeader';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import CenterCard from './CenterCard';
import DeleteZoneModal from './DeleteZoneModal';
import ZoneCard from './ZoneCard';

function TFCCList({
  centers,
  zones,
  centerLoading,
  centerPage,
  centerTotalResults,
  setCenterPage,
  zoneLoading,
  openCenterDeleteModal,
  openZoneDeleteModal,
}: {
  centers: TFCCType[] | undefined;
  zones: TFCCZoneType[] | undefined;
  centerLoading: boolean;
  centerPage: number;
  setCenterPage: React.Dispatch<React.SetStateAction<number>>;
  centerTotalResults: number;
  zoneLoading: boolean;
  openCenterDeleteModal: (center: TFCCType) => void;
  openZoneDeleteModal: (zone: TFCCZoneType) => void;
}) {
  return (
    <>
      <SectionHeader title='TFCC Zones' />
      {zoneLoading ? (
        <Loader />
      ) : zones && zones.length > 0 ? (
        zones.map((zone) => (
          <ZoneCard
            zone={zone}
            key={zone._id}
            openZoneDeleteModal={openZoneDeleteModal}
          />
        ))
      ) : (
        <span className='text-md'>No zone found</span>
      )}
      <br />
      <SectionHeader title='TFCC Centers' />
      {centerLoading ? (
        <Loader />
      ) : centers && centers.length > 0 ? (
        centers.map((center) => (
          <CenterCard
            center={center}
            key={center._id}
            openCenterDeleteModal={openCenterDeleteModal}
          />
        ))
      ) : (
        <span className='text-md'>No center found</span>
      )}
    </>
  );
}

export default TFCCList;
