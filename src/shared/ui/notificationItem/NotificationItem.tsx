import s from './NotificationItem.module.scss';

export const NotificationItem = ({ text }: { text: string }) => (
  <div className={s.notification}>
    <p>
      <strong>Новое уведомление!</strong> <span className={s.new}>New</span>
    </p>
    <p>Следующий платеж у вас спишется через 1 день</p>
    <small>1 час назад</small>
  </div>
);

/*
<div className={s.notificationEl}>
  <Typography className={s.notificationItem} variant={'h2'}>
    {text}
  </Typography>
</div>*/
