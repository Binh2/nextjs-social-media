import { Checkbox, DynamicSelect, Input, Option, PublicitySelect, RadioButton, Textarea } from "@/components/common/controls";
import { YearRangePicker } from "@/components/common/controls/YearRangePicker";
import { transformResponse } from "@/lib/axiosBigint";
import { Publicities } from "@/lib/constants/publicities";
import { SchoolTypes } from "@/lib/constants/schoolTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schools, SchoolCourses, SchoolDegrees } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod"

function getZodDefaults<Schema extends z.AnyZodObject>(schema: Schema) {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault) return [key, value._def.defaultValue()]
      return [key, undefined]
    })
  )
}

const FormSchema = z.object({
  school: z.string().min(6, "School name need to be atleast 6 characters"),
  fromYear: z.number().optional(),
  toYear: z.number().optional(),
  graduated: z.boolean().default(false),
  description: z.string().optional(),  
  course1: z.string().optional(),
  course2: z.string().optional(),
  course3: z.string().optional(),
  program: z.string().default('undergraduate'),
  degree: z.string(),
  publicity: z.string().default(Publicities.PUBLIC),
})
const defaultValues = getZodDefaults(FormSchema);
type FormSchemaType = z.infer<typeof FormSchema>;
export default function UniversityForm({onCancel}: {onCancel: () => void}) {
  const { data: session, status } = useSession();
  const { control, register, reset, handleSubmit, getValues, formState: { errors, isSubmitting } } = 
  useForm<FormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
  });

  const submit = handleSubmit(async (data) => {
    if (!session?.user.handle) return;
    const postData = {
      schoolName: data.school,
      schoolTypeName: SchoolTypes.UNIVERSITY,
      from: data.fromYear,
      to: data.toYear,
      graduated: data.graduated,
      description: data.description,
      undergraduate: data.program == 'undergraduate',
      course1Name: data.course1,
      course2Name: data.course2,
      course3Name: data.course3,
      schoolDegreeName: data.degree,
      publicityName: data.publicity
    }
    const res = await fetch("/api/schools/user_schools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
    if (res.ok) {
      reset();
      onCancel();
    }
  })
  const loading = status == 'loading' || isSubmitting;

  return (<>
    <form className={``} onSubmit={submit}>
      <div>
        <div className={`mb-2`}>
          <SchoolController control={control} />
          { errors.school && <p className="error">{errors.school.message || ''}</p>}
        </div>
        <label htmlFor="university__from">Time Period</label>

        <Controller control={control} name="fromYear" render={({field: field1}) => 
          <Controller control={control} name="toYear" render={({field: field2}) => 
            <YearRangePicker year1Id="university__from" className={``} 
            year1={field1.value} year1OnChange={field1.onChange}
            year2={field2.value} year2OnChange={field2.onChange} />
          } />
        } />

        <div className={`mb-2 flex items-center`}>
          <Controller control={control} name="graduated" render={({field}) => 
            <Checkbox id="university__graduated" checked={field.value || defaultValues.graduated} onChange={field.onChange} className={`mr-1`} />
          } />
          <label htmlFor="university__graduated">Graduated</label>
        </div>

        <Controller control={control} name="description" render={({field}) => 
          <Textarea id="university__description" label="Description" className={`mb-2`} value={field.value} onChange={field.onChange}></Textarea>
        } />
        <div className={`mb-2`}>
          <p>Concentration</p>
          <CourseController courseNumber={1} control={control} />
          <CourseController courseNumber={2} control={control} />
          <CourseController courseNumber={3} control={control} />
        </div>

        <p>Attended for</p>
        <ProgramController control={control} className={`mb-2`} />

        <DegreeController control={control} className={`mb-2`} />
        <div className={`flex justify-between mb-2`}>
          <Controller control={control} name="publicity" render={({field}) => 
            <PublicitySelect id='university__publicity' value={field.value} onChange={field.onChange} />
          } />
          <div className={`flex`}>
            <button className={`button`} onClick={onCancel} type="button">Cancel</button>
            <button className={`button button--standout disabled:opacity-50`} disabled={loading}>Submit</button>
          </div>
        </div>
      </div>
    </form>
  </>)
}
function SchoolController({control, className=''}: {control: any, className?: string}) {
  const promiseValues = async (query: string) => (await axios.get("/api/schools", { params: { query }, transformResponse }).then(res => res.data) as Schools[]).map(({name}) => name);
  return (<Controller control={control} name='school' render={({ field }) => 
    (<DynamicSelect className={className} id='university__school' name='school' label='School' value={field.value} onChange={field.onChange} 
      promiseValues={promiseValues} />)}
  />)
}
function CourseController({className='', courseNumber, control}: {className?: string, courseNumber: number, control: any}) {
  const promiseValues = async (query: string) => (await axios.get("/api/schools/courses", { params: { query }, transformResponse }).then(res => res.data) as SchoolCourses[]).map(({name}) => name);
  return (<Controller control={control} name={`course${courseNumber}`} render={({ field }) => 
    (<DynamicSelect className={className} id={`university__course${courseNumber}`} label={`Course ${courseNumber}`} value={field.value} onChange={field.onChange} 
    promiseValues={promiseValues} />)}
  />)
}
function DegreeController({className='', control}: {className?: string, control: any}) {
  const promiseValues = async (query: string) => (await axios.get("/api/schools/degrees", { params: { query }, transformResponse }).then(res => res.data) as Schools[]).map(({name}) => name) 
  return (<Controller control={control} name='degree' render={({ field }) => 
    (<DynamicSelect className={className} id='university__degree' value={field.value} label='Degree' onChange={field.onChange} 
      promiseValues={promiseValues} />)}
  />)
}

function ProgramController({control, className=''}: {control: any, className?: string}) {
  return (<Controller control={control} name="program" render={({field}) => (
    <div className={className}>
      <div className={`flex items-center`}>
        <RadioButton className={`mr-1`} id="university__program-undergraduate" value="undergraduate" checked={(field.value || defaultValues.program) == "undergraduate"} onChange={field.onChange} />
        <label htmlFor="university__program-undergraduate">Undergraduate</label>
      </div>
      <div className={`flex items-center`}>
        <RadioButton className={`mr-1`} id="university__program-postgraduate" value="postgraduate" checked={(field.value || defaultValues.program) == "postgraduate"} onChange={field.onChange} />
        <label htmlFor="university__program-postgraduate">Postgraduate</label>
      </div>
    </div>
  )} />
  )
}