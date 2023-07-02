import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import Select, { GroupBase, OptionProps } from 'react-select';
import { components } from 'react-select';
const { Option } = components;

type IconOptionType = { 
  value: string, 
  label: string, 
  src: string,
  alt: string,
  width: number,
  height: number,
  style?: Object,
};

type Props = {
  defaultValue: any;
  onChange?: Dispatch<SetStateAction<any>>;
  options: IconOptionType[];
}

export function SelectWithIcon(props: Props) {
  const { defaultValue, onChange, options } = props;
  const [ value, setValue ] = useState(defaultValue);
  const option = options.find(o => o.value == value);

  return (<>
    <div>
      <Image src={option?.src || ''} alt={option?.alt || ''} width={option?.width || 0} height={option?.height || 0}
        className="rounded-[100%]"></Image>
      <Select
        defaultValue={defaultValue}
        onChange={v => { onChange && onChange(v); setValue(v);}}
        options={options}
        components={{ Option: IconOption }}
        className={`ml-${option?.width || 0}`}
      ></Select>
    </div>
  </>)
}

type IconOptionProps = OptionProps<any, false, GroupBase<any>> & {data: IconOptionType}
const IconOption = (props: IconOptionProps) => {
  const { src, alt, width, height, style } = props.data;
  const label = props.label;
  return <Option {...props}>
    <Image {...{ src, alt, width, height, style }}></Image>
    {label}
  </Option> 
}