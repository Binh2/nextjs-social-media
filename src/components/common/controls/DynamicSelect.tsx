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

export function DynamicSelect({id, value, onChange, label='', promiseOptions, mutate, loading, ...props}: {id: string, value?: string, onChange?: any, label: string, promiseOptions: (query: string) => Promise<Option[]>, mutate: (value: string) => void, loading: boolean}) {
  const [ focus, setFocus ] = useState(false);
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
      loadOptions={promiseOptions}
      isDisabled={loading} isLoading={loading}
      onChange={option => {onChange && onChange(option?.value || '')}}
      onCreateOption={value => mutate(value)}
      ></AsyncCreatableSelect>
    </WithLabel> 
  </>)
}
export function useDynamicSelect(apiUrl: string) {
  const [ value, setValue ] = useState('')
  const promiseOptions = async (query: string): Promise<Option[]> => {
    const schools: School[] = await axios.get(apiUrl, {
      params: { query }, 
      transformResponse
    }).then(res => res.data);
    return schools?.map(({name}) => ({label: name, value: name}))
  }
  const mutation = useMutation({
    mutationFn: async (school: {name: string, type: string}) => {
      return await axios.post(apiUrl, school).then(res => res.data)
    },
    onSuccess: (school: School) => {
      setValue(school.name);
    }
  })
  const { mutate, isLoading: loading } = mutation;
  return { value, setValue, promiseOptions, mutate, loading }
}