import { transformResponse } from "@/lib/axiosBigint";
import { SchoolTypes } from "@/lib/constants/school";
import { School } from "@prisma/client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AsyncCreatableSelect from 'react-select/async-creatable';
import './DynamicSelect.css'
import { WithLabel } from "./WithLabel";
import { SelectInstance } from "react-select";

export type Option = {
  label: string,
  value: string,
}

export function DynamicSelect({id, value, onChange, label='', promiseValues, mutate, loading, ...props}: {id: string, value: string, onChange: (value: string) => void, label: string, promiseValues: (query: string) => Promise<string[]>, mutate: (value: string) => void, loading: boolean}) {
  const [ focus, setFocus ] = useState(false);
  const [ option, setOption ] = useState<Option | null>(null);
  useEffect(() => {
    const newOption = { label: value, value };
    if (option != newOption) setOption(newOption);
  }, [value]);

  return (<>
    <WithLabel label={label} focus={focus} value={value || ''} htmlFor={id}>
      <AsyncCreatableSelect {...props} 
      unstyled
      placeholder=''
      className="dynamic-select"
      classNamePrefix='dynamic-select'
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      blurInputOnSelect={focus}
      inputId={id}
      isClearable
      cacheOptions
      defaultOptions
      loadOptions={(query) => promiseValues(query).then(values => values.map(value => { console.log(value); return ({label: value, value})}))}
      isDisabled={loading} isLoading={loading}
      value={option}
      onChange={option => {onChange && onChange(option?.value || ''); setOption(option)}}
      onCreateOption={value => mutate(value)}
      />
    </WithLabel> 
  </>)
}