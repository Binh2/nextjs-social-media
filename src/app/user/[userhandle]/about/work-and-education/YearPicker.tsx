import { useState } from "react";
import DatePicker from 'react-datepicker';
import { Controller } from "react-hook-form";

type Props = {
  control: any,
  name: string,
}

export function YearPicker({control, name}: Props) {
  return (<>
    <Controller control={control} name={name} render={({field}) => 
      <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)}
        showYearPicker dateFormat="yyyy"
        ></DatePicker>
      } />
  </>)
}