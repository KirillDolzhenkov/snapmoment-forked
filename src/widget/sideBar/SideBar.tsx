import React, { ComponentProps, ElementType, useState } from 'react';

import Bookmark from '@/../public/assets/components/Bookmark';
import Home from '@/../public/assets/components/Home';
import LogOutOutline from '@/../public/assets/components/LogOutOutline';
import MessageCircle from '@/../public/assets/components/MessageCircle';
import Person from '@/../public/assets/components/Person';
import PlusSquare from '@/../public/assets/components/PlusSquare';
import SearchOutline from '@/../public/assets/components/SearchOutline';
import TrendingUp from '@/../public/assets/components/TrendingUp';
import { useLogoutMutation, useMeQuery } from '@/shared/api/auth/authApi';
import { ModalKey, useCustomToast, useModal } from '@/shared/lib';
import { Button, Typography } from '@/shared/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './SideBar.module.scss';

import { CreatePostModal } from '../modals/createPostModal/CreatePostModal';

type MainLinksProps = {
  IconComponent: ElementType;
  name: MainLinksName;
  path: string;
  value: LinksValue;
};

type LinksValue =
  | ''
  | 'favorites'
  | 'home'
  | 'logout'
  | 'message'
  | 'profile'
  | 'recovery-password'
  | 'search'
  | 'sign-in'
  | 'sign-up'
  | 'statistics';

type MainLinksName =
  // | 'Create'
  'Favorites' | 'Home' | 'Log Out' | 'Messenger' | 'My Profile' | 'Recovery Password' | 'Search' | 'Statistics';

type Props = ComponentProps<'div'>;
export const SideBar = (props: Props) => {
  const [logout] = useLogoutMutation();

  const accessToken = (typeof window !== 'undefined' && localStorage.getItem('accessToken')) || null;

  // ! Это для axios, вместо RTKQ, но для Yandex все также не работает
  // console.log({ accessToken });
  // const logout = () =>
  //   axios.post(
  //     'https://inctagram.work/api/v1/auth/logout',
  //     {}, // Тело запроса (оставлено пустым, так как нет данных для передачи)
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       },
  //       withCredentials: true // Для отправки cookies
  //     }
  //   );

  const logoutHandler = async () => {
    // ! это для Yandex, чтобы не через RTKQ
    // logout()
    //   .then(() => {
    //     console.log({ adas: accessToken });
    //     // localStorage.removeItem('accessToken')
    //     router.push('/auth/sign-in');
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    try {
      await logout()
        .unwrap()
        .then(() => {
          router.push('/auth/sign-in');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const [activeIcon, setActiveIcon] = useState<LinksValue>('');
  const { data: me } = useMeQuery();
  const router = useRouter();
  const { isOpen, setOpen } = useModal(ModalKey.CreatePost);
  const { showPromiseToast } = useCustomToast();

  const openCreatePostModalHandler = () => {
    setOpen(true);
  };

  const mainLinks: MainLinksProps[] = [
    { IconComponent: Home, name: 'Home', path: '/home', value: 'home' },
    { IconComponent: Person, name: 'My Profile', path: `/profile/${me?.userId}`, value: 'profile' },
    { IconComponent: MessageCircle, name: 'Messenger', path: '/message', value: 'message' },
    { IconComponent: SearchOutline, name: 'Search', path: '/search', value: 'search' },
    { IconComponent: TrendingUp, name: 'Statistics', path: '/statistics', value: 'statistics' },
    { IconComponent: Bookmark, name: 'Favorites', path: '/favorites', value: 'favorites' }
  ];

  return (
    <div className={s.container}>
      <CreatePostModal isOpen={isOpen} setOpen={setOpen} />
      <div className={s.btns}>
        {mainLinks.map(({ IconComponent, name, path, value }) => (
          <Link className={s.btn} href={path} key={value} onClick={() => setActiveIcon(value)} shallow>
            <IconComponent
              className={clsx(s.icon, { [s.active]: activeIcon === value }, value === 'search' && s.searchIcon)}
            />
            <Typography as={'span'} className={s.btnText} variant={'medium_text_14'}>
              {name}
            </Typography>
          </Link>
        ))}
        <Button className={s.btn} onClick={openCreatePostModalHandler} variant={'text'}>
          <PlusSquare className={s.icon} />
          <Typography as={'span'} className={s.btnText} variant={'medium_text_14'}>
            Create
          </Typography>
        </Button>
        <Button className={s.btn} onClick={logoutHandler} variant={'text'}>
          <LogOutOutline className={s.icon} />
          Log out
        </Button>
      </div>
    </div>
  );
};
