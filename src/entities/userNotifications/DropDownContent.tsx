import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { useLazyGetNotificationsQuery } from '@/shared/api/notifications/notificationsAPI';
import { INotificationItem } from '@/shared/api/notifications/notificationsTypes';
import { IUseInfiniteScroll, useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { NotificationItem, Typography } from '@/shared/ui';

import s from '@/entities/userNotifications/UserNotifications.module.scss';

type Props = {
  readedNotifications: number[];
  setReadedNotifications: (readedNotices: number[]) => void;
};

const NEXT_NOTICES_COUNT = 1;

export const DropDownContent = (props: Props) => {
  const { readedNotifications, setReadedNotifications } = props;
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [fetchNotices, { data: noticesData, isFetching: isNoticesFetching }] = useLazyGetNotificationsQuery();

  const hasNoMoreNotices = noticesData?.totalCount === noticesData?.items.length;

  // Обновление уведомлений при наведении
  const handleItemHover = useCallback(
    (itemID: number) => () => {
      if (!readedNotifications.includes(itemID)) {
        setReadedNotifications([...readedNotifications, itemID]);
      }
    },
    [readedNotifications, setReadedNotifications]
  );

  useEffect(() => {
    fetchNotices({ pageSize: 3 });
  }, []);

  const onLoadNextNotices = useCallback(() => {
    if (!isNoticesFetching && !hasNoMoreNotices && noticesData) {
      fetchNotices({ pageSize: noticesData.items.length + NEXT_NOTICES_COUNT });
    }
  }, [isNoticesFetching, noticesData, hasNoMoreNotices]);

  useInfiniteScroll({
    callBack: onLoadNextNotices,
    rootMargin: '0px',
    threshold: 0.1,
    triggerRef
  } as IUseInfiniteScroll);

  useEffect(() => {
    if (noticesData && noticesData.items) {
      setNotifications([...noticesData.items]);
    }
  }, [noticesData]);

  return (
    <div>
      <div className={s.title}>
        <Typography variant={'bold_text_16'}>Notifications</Typography>
      </div>

      <div className={s.msgsWrapper}>
        <div>
          <div className={s.msgs}>
            {noticesData && noticesData.items.length === 0 && (
              <div className={s.noNotifications}>
                <Typography variant={'regular_text_14'}>You have no new notices</Typography>
              </div>
            )}

            {noticesData &&
              noticesData.items.length > 0 &&
              notifications.map((notice) => (
                <div key={notice.id} onMouseEnter={handleItemHover(notice.id)}>
                  <NotificationItem
                    isReadedNotice={readedNotifications.includes(notice.id) || notice.isRead}
                    notice={notice}
                  />
                </div>
              ))}
          </div>
          <div ref={triggerRef} style={{ opacity: 0 }}>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
