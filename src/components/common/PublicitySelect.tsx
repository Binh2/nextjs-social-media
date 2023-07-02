import { useState } from 'react';
import Select from 'react-select';
import { SelectWithIcon } from './SelectWithicon';

const options = [
  { value: "public", label: "Public", src: "/public-icon.svg", alt: "Public icon", width: 24, height: 24 },
  { value: "onlyme", label: "Only me", src: "/lock-closed.svg", alt: "Only me icon", width: 24, height: 24 },
]

export function PublicitySelect() {
  const [ value, setValue ] = useState('public');
  return <SelectWithIcon value={value} setValue={setValue} options={options}></SelectWithIcon>
}