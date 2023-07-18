import { DynamicSelect, Input, Option, Textarea } from "@/components/common/controls";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod"

const FormSchema = z.object({
  school: z.string().min(6, "School name need to be atleast 6 characters"),
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
    mode: "onChange",
    resolver: zodResolver(FormSchema),
  });
  const submit = handleSubmit(async (data) => {
    await axios.post("", {

    })
  })
  return (<>
    <form className={``}>
      <div>
        <Controller control={control} name='school' render={({ field }) => 
          <DynamicSelect id='school' value={field.value} label='School' onChange={field.onChange} />}
        />
        { errors.school && <p className="error">{errors.school.message || ''}</p>}
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
            <button className={`button`}>Cancel</button>
            <button className={`button button--standout`}>Submit</button>
          </div>
        </div>
      </div>
      <div>

      </div>
    </form>
  </>)
}