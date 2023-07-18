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

const promiseOptions = async (inputValue: string): Promise<Option[]> => {
  const schools: School[] = await axios.get("/api/school", {
    params: {
      query: inputValue
    },
    transformResponse
  }).then(res => res.data);
  return schools?.map(({name}) => ({label: name, value: name}))
}

export function DynamicSelect({id, value, onChange, label='', inputRef, ...props}: {id: string, value?: string, onChange?: any, label: string, inputRef?: any}) {
  const [ option, setOption ] = useState<Option | null>(null)
  const { mutate, isLoading: loading } = useMutation({
    mutationFn: async (school: {name: string, type: string}) => {
      return await axios.post("/api/school", school).then(res => res.data)
    },
    onSuccess: (school: School) => {
      const newValue = {value: school.name, label: school.name};
      setOption(newValue);
      onChange && onChange(newValue.value);
    }
  })
  const [ focus, setFocus ] = useState(false);
  return (<>
    <WithLabel label={label} focus={focus} value={option?.value || ''} htmlFor={id}>
      <AsyncCreatableSelect {...props} 
      ref={inputRef}
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
      loadOptions={promiseOptions}
      isDisabled={loading} isLoading={loading}
      value={option} 
      onChange={option => {setOption(option); onChange && onChange(option?.value || '')}}
      // isOptionSelected={option => onChange && onChange(option?.value || '')}
      // onInputChange={newValue => onChange && onChange(newValue || option?.value || '')}
      onCreateOption={(value: string) => mutate({ name: value, type: SchoolTypes.UNIVERSITY})}
      ></AsyncCreatableSelect>
    </WithLabel> 
  </>)
}