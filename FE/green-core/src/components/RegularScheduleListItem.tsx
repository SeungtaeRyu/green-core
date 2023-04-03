import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ScheduleDeleteModal from './modal/ScheduleDeleteModal';
import ScheduleModal from './modal/ScheduleModal';
import ScheduleCode from './ScheduleCode';
import styles from './RegularScheduleListItem.module.scss';

type PropsType = {
  item: any;
  handleReload?: () => void;
};

export default function RegularScheduleListItem({ item, handleReload }: PropsType) {
  const [isOpenRegularScheduleUpdateModal, setIsOpenRegularScheduleUpdateModal] = useState(false);
  const [isOpenRegularScheduleDeleteModal, setIsOpenRegularScheduleDeleteModal] = useState(false);

  return (
    <>
      {isOpenRegularScheduleUpdateModal && (
        <ScheduleModal
          isOpen={isOpenRegularScheduleUpdateModal}
          modalTitle='정기스케줄 수정'
          regularId={item.regularScheduleId}
          regular
          schedule={item}
          handleReload={handleReload}
          handleModalClose={() => setIsOpenRegularScheduleUpdateModal(false)}
        />
      )}
      {isOpenRegularScheduleDeleteModal && (
        <ScheduleDeleteModal
          isOpen={isOpenRegularScheduleDeleteModal}
          modalTitle='정기스케줄 삭제'
          regularId={item.regularScheduleId}
          handleReload={handleReload}
          handleModalClose={() => setIsOpenRegularScheduleDeleteModal(false)}
        />
      )}
      <div className={`${styles.container}`}>
        <div className={`${styles.icon}`}>
          <ScheduleCode scheduleCode={item.scheduleCode} size='lg' />
        </div>
        <div onClick={() => setIsOpenRegularScheduleUpdateModal(true)} className={`${styles.text}`}>
          {item.content}
        </div>
        <FontAwesomeIcon icon={faRemove} color='#D9D9D9' className={`${styles.check}`} onClick={() => setIsOpenRegularScheduleDeleteModal(true)} />
      </div>
    </>
  );
}
