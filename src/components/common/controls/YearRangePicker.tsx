import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function YearRangePicker({className=''}: {className?: string}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (<>
    <div className={className}>
      <div className={`relative inline-block`}>
        <FontAwesomeIcon icon={faCaretDown} className="fa-solid absolute z-[1] right-2 top-[50%] -translate-y-[50%]" />
        <DatePicker
        className={`px-3 py-1 outline-none border border-gray-600 rounded-lg`}
        selected={startDate}
        onChange={(date) => date && date.getFullYear() <= endDate.getFullYear() && setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy"
        showYearPicker
        />
      </div>
      <p className={`inline-block px-2`}>to</p>
      <div className={`relative inline-block`}>
        <FontAwesomeIcon icon={faCaretDown} className="fa-solid absolute z-[1] right-2 top-[50%] -translate-y-[50%]" />
        <DatePicker
        className={`px-3 py-1 outline-none border border-gray-600 rounded-lg`}
        selected={endDate}
        onChange={(date) => date && startDate.getFullYear() <= date.getFullYear() && setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy"
        showYearPicker
        />
      </div>
    </div>
  </>)
}