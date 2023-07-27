import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function YearRangePicker({className='', year1Id='', year2Id='', year1, year2, year1OnChange, year2OnChange}: {className?: string, year1Id?: string, year2Id?: string, year1?: number, year2?: number, year1OnChange: (year1: number) => void, year2OnChange: (year2: number) => void}) {
  const [date1, setDate1] = useState(year1 ? new Date(year1, 1, 1) : null);
  const [date2, setDate2] = useState(year2 ? new Date(year2, 1, 1) : null);
  function setYear1(year1: number) { setDate1(year1 ? new Date(year1, 1, 1) : null); year1OnChange(year1); }
  function setYear2(year2: number) { setDate2(year2 ? new Date(year2, 1, 1) : null); year2OnChange(year2); }

  return (<>
    <div className={className}>
      <div className={`relative inline-block`}>
        <FontAwesomeIcon icon={faCaretDown} className="fa-solid absolute z-[1] right-2 top-[50%] -translate-y-[50%]" />
        <DatePicker
        id={year1Id}
        className={`px-3 py-1 outline-none border border-gray-600 rounded-lg`}
        selected={date1}
        onChange={(date) => date && (year2 ? (date.getFullYear() <= year2 && setYear1(date.getFullYear())) : (setYear1(date.getFullYear())))}
        selectsStart
        startDate={date1}
        endDate={date2}
        dateFormat="yyyy"
        showYearPicker
        />
      </div>
      <p className={`inline-block px-2`}>to</p>
      <div className={`relative inline-block`}>
        <FontAwesomeIcon icon={faCaretDown} className="fa-solid absolute z-[1] right-2 top-[50%] -translate-y-[50%]" />
        <DatePicker
        id={year2Id}
        className={`px-3 py-1 outline-none border border-gray-600 rounded-lg`}
        selected={date2}
        onChange={(date) => date && (year1 ? (year1 <= date.getFullYear() && setYear2(date.getFullYear())): (setYear2(date.getFullYear())))}
        selectsEnd
        startDate={date1}
        endDate={date2}
        dateFormat="yyyy"
        showYearPicker
        />
      </div>
    </div>
  </>)
}