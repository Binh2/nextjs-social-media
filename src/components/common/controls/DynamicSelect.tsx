import { transformResponse } from "@/lib/axiosBigint";
import { SchoolTypes } from "@/lib/constants/school";
import { School } from "@prisma/client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AsyncCreatableSelect from 'react-select/async-creatable';
import './DynamicSelect.css'
import { WithLabel } from "./WithLabel";

type Option = {
  label: string
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

export function DynamicSelect({id, value, onChange, label='', ...props}: {id: string, value?: any, onChange?: any, label: string}) {
  const [ _value, setValue ] = useState<Option | null>(null)
  const { mutate, isLoading: loading } = useMutation({
    mutationFn: async (school: {name: string, type: string}) => {
      return await axios.post("/api/school", school).then(res => res.data)
    },
    onSuccess: (school: School) => {
      const newValue = {value: school.name, label: school.name};
      setValue(newValue);
      onChange && onChange(newValue);
    }
  })
  const [ focus, setFocus ] = useState(false);
  return (<>
    <WithLabel label={label} focus={focus} value={_value?.value || ''} htmlFor={id}>
      <AsyncCreatableSelect {...props} 
      unstyled
      placeholder=''
      className="dynamic-select"
      classNamePrefix='dynamic-select'
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      inputId={id}
      isClearable
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      isDisabled={loading} isLoading={loading}
      value={_value} onChange={value => {setValue(value); onChange && onChange(value)}}
      onCreateOption={(value: string) => mutate({ name: value, type: SchoolTypes.UNIVERSITY})}
      ></AsyncCreatableSelect>
    </WithLabel> 
  </>)
}