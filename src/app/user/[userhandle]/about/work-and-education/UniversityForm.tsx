import { DynamicSelect, Input, Textarea } from "@/components/common/controls";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod"
import Select from 'react-select'
import { useQuery } from "@tanstack/react-query";
import { transformResponse } from "@/lib/axiosBigint";

const FormSchema = z.object({
  school: z.string(),
  fromYear: z.number(),
  toYear: z.number(),
  graduated: z.boolean(),
  description: z.string(),  
  course1: z.string().optional(),
  course2: z.string().optional(),
  course3: z.string().optional(),
  programs: z.number(),
  degree: z.string(),
})
type FormSchemaType = z.infer<typeof FormSchema>;
export default function UniversityForm() {
  const { control, register, reset, handleSubmit, getValues, formState: { errors, isSubmitting } } = 
  useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const submit = handleSubmit(async (data) => {
    await axios.post("", {

    })
  })
  return (<>
    <form className={``}>
      <div>
        {/* <Input id="school" label="School" {...register('school')}></Input>  */}
        <DynamicSelect id='school' label='School' {...register('school')}></DynamicSelect>
        <p>Time Period</p>

        <Textarea id="description" label="Description" {...register('description')}></Textarea>
        <p>Concentration</p>
        <Input id="course1" label="Course 1" {...register('course1')}></Input>
        <Input id="course2" label="Course 2" {...register('course2')}></Input>
        <Input id="course3" label="Course 3" {...register('course3')}></Input>
        <Input id="degree" label="Degree" {...register('degree')}></Input>
        <div className={`flex justify-between`}>
          <button></button>
          <div className={`flex`}>
            <button>Cancel</button>
            <button>Submit</button>
          </div>
        </div>
      </div>
      <div>

      </div>
    </form>
  </>)
}
