import React from 'react';

import Close from '@/../public/assets/components/Close';
import { useDeleteNotificationsMutation } from '@/shared/api/notifications/notificationsAPI';
import { INotificationItem } from '@/shared/api/notifications/notificationsTypes';
import { Button, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './NotificationItem.module.scss';

type Props = {
  isReadedNotice: boolean;
  notice: INotificationItem;
};

export const NotificationItem = (props: Props) => {
  const {
    isReadedNotice,
    notice: { id, message }
  } = props;
  const [deleteNotification] = useDeleteNotificationsMutation();

  const handleRemoveNotice = () => {
    console.log(id);
    deleteNotification({ id });
  };

  return (
    <div className={s.notification}>
      <div className={s.closeButtonWrap}>
        <Button className={s.closeButton} onClick={handleRemoveNotice} title={'Clear'} variant={'text'}>
          <Close />
        </Button>
      </div>
      <div className={s.title}>
        {!isReadedNotice && (
          <div className={s.newBox}>
            <Typography variant={'bold_text_16'}>New notice!</Typography>
            <Typography className={s.new} variant={'small_text'}>
              New
            </Typography>
          </div>
        )}
        {isReadedNotice && <div className={s.readedNotice}></div>}
      </div>

      <Typography className={clsx(s.message, isReadedNotice && s.isRead)} variant={'regular_text_14'}>
        {message}
        {id}
      </Typography>
      <Typography className={s.time} variant={'small_text'}>
        1 час назад
      </Typography>
    </div>
  );
};
