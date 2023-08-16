"use client"
const UniversityForm = lazy(() => import("./UniversityForm"));
import { lazy, useState } from "react"
import { WorkForm } from "./WorkForm"
import { LazyForm } from "@/components/common/controls/LazyForm";

export default function Page() {
  const [ showUniversity, setShowUniversity ] = useState(false);
  return (<>
    <div className={`w-full`}>
      <h2>Work</h2>
      <WorkForm></WorkForm>
      
      <h2 className={`text-lg`}>University</h2>
      <LazyForm show={showUniversity} setShow={setShowUniversity}><UniversityForm onCancel={() => setShowUniversity(false)} /></LazyForm>
      <h2>High School</h2>
    </div>
  </>)
}