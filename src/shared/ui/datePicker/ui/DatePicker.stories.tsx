import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { DatePicker } from './DatePicker';

interface CustomArgs {}

type StoryProps = CustomArgs;

const meta: Meta<StoryProps> = {
  argTypes: {},
  component: DatePicker,
  tags: ['autodocs'],
  title: 'Components/DatePicker'
};

export default meta;

const Defoult: StoryFn<StoryProps> = (args: StoryProps) => {
  const [date, setDate] = useState<Date>(new Date('2020-01-01'));

  return (
    <>
      <div style={{ width: '300px' }}>
        <DatePicker onChange={setDate} value={date} />
      </div>
    </>
  );
};

export { Defoult };
