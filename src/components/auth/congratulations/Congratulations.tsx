import React from 'react';

import Girl from '@/common/assets/components/GirlDefault';
import { Button } from '@/components/ui/button/Button';
import { Typography } from '@/components/ui/typography/Typography';

import s from './Congratulation.module.scss';
const Congratulations = () => {
  return (
    <div>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Congratulations!
      </Typography>
      <Typography as={'p'} className={s.subtitle} variant={'regular_text_16'}>
        Your email has been confirme
      </Typography>
      <div className={s.buttonBox}>
        <Button className={s.button}>Sign In</Button>
      </div>
      <div className={s.boxImg}>
        <Girl />
      </div>
    </div>
  );
};

export default Congratulations;