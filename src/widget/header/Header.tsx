import React from 'react';

import { UserNotifications } from '@/entities';
import { LocaleSwitcher } from '@/features';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { AppLogo, AuthButtons, Wrapper } from '@/shared/ui';
//import { Button } from '@/shared/ui';
import { useRouter } from 'next/router';

import s from './Header.module.scss';
export const Header = () => {
  const { data: me } = useMeQuery();
  const { pathname } = useRouter();

  return (
    <header className={s.header}>
      <Wrapper className={s.wrapper} variant={'box'}>
        <AppLogo />

        {/*<Button variant={'primary'}>Search</Button>
        <Button variant={'secondary'}>Search</Button>
        <Button variant={'outlined'}>Search</Button>*/}

        <div className={s.itemsWrapper}>
          {me && <UserNotifications />}
          <LocaleSwitcher />
          {!me && <AuthButtons pathname={pathname} />}
        </div>
      </Wrapper>
    </header>
  );
};
