import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import { Button, SelectDropdown, Chip } from 'ui-kit'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)


const loadOptions = ()=>new Promise((resolve)=>{
  resolve([
    {
      name: 'First option',
      id: 1,
    },
    {
      name: 'Second option',
      id: 2,
    },
    {
      name: 'Third option',
      id: 3,
    },
  ])
})

const onChange = ()=>{}
const renderValues = (values)=>values.map((id)=>{
  return <Chip deletable key={id}>{id}</Chip>
})
storiesOf('SelectDropdown', module)
  .add('noConfig', () => <SelectDropdown onChange={onChange} renderValues={renderValues} value={[1]} loadOptions={loadOptions}/>)
  .add('create', () => <SelectDropdown  create onChange={action('create')} renderValues={renderValues} value={[1]} loadOptions={loadOptions}/>)
  .add('noValue', () => <SelectDropdown label="Prescriptions" onChange={onChange} renderValues={renderValues} value={[]} loadOptions={loadOptions}/>)