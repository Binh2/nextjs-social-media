"use client"
const UniversityForm = lazy(() => import("./UniversityForm"));
import { lazy } from "react"
import { WorkForm } from "./WorkForm"
import { LazyForm } from "@/components/common/controls/LazyForm";

export default function Page() {
  return (<>
    <div className={`w-full`}>
      <h2>Work</h2>
      <WorkForm></WorkForm>
      <h2>University</h2>
      <LazyForm LazyComponent={UniversityForm}></LazyForm>
      <h2>High School</h2>
    </div>
  </>)
}