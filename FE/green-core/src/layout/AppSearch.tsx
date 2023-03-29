import React, { useEffect } from 'react';
import AppHeader2 from './AppHeader2';
import HomeSearch from './HomeSearch';
import ScheduleSearch from './ScheduleSearch';
import PlantDocsSearch from './PlantDocsSearch';
import styles from './AppSearch.module.scss';
import { useAppSelector } from '@/core/hooks';

export default function AppSearch() {
  const searchState = useAppSelector((state) => state.common.searchState || 'home');

  return (
    <div className={`${styles.container} lg:block hidden overflow-auto lg:w-1/3 px-7 py-5`}>
      {searchState === 'home' ? (
        <>
          <HomeSearch></HomeSearch>
        </>
      ) : searchState === 'schedule' ? (
        <>
          <ScheduleSearch></ScheduleSearch>
        </>
      ) : searchState === 'plantDocs' ? (
        <>
          <PlantDocsSearch></PlantDocsSearch>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
