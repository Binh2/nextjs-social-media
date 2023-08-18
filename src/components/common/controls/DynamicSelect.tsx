import { useEffect, useRef, useState } from "react";
import './DynamicSelect.css'
import { WithLabel } from "./WithLabel";
import { Loading } from "../Loading";
import { XMarkIcon } from "@heroicons/react/24/solid";

export function DynamicSelect({id, value, onChange, label='', name='', promiseValues, className='', ...props}: 
{id: string, value: string, label: string, className?: string, name?: string,
onChange: (value: string) => void, 
promiseValues: (query: string) => Promise<string[]>}) {
  const [ focus, setFocus ] = useState(false);
  const [ delayedFocus, setDelayedFocus ] = useState(false);
  const [ query, setQuery ] = useState('');
  const [ values, setValues ] = useState<string[]>([])
  const [ loading, setLoading ] = useState(false);
  const queryCache = useRef<{ [key: string]: string[] }>({});
  useEffect(() => {
    if (queryCache.current[query]) {
      setLoading(false);
      setValues(queryCache.current[query]);
      return;
    }
    setLoading(true)
    promiseValues(query).then((values) => {
      setLoading(false);
      setValues(values);
      queryCache.current[query] = values
    })
  }, [query]);

  useEffect(() => {
    if (focus) {
      setDelayedFocus(focus);
      return;
    }
    const timeout = setTimeout(() => {
      setDelayedFocus(focus);
      setQuery('')
    }, 200);
    return () => clearTimeout(timeout)
  }, [focus])
  // console.log(query, queryCache.current, focus, value, loading, values)

  return (<>
    <div className={`relative w-full ${className}`}>
      <label className={`
        ${focus && 'text-teal-600 text-xs'}
        ${value && 'text-xs'}
        ${focus || value ? 'pt-1' : 'pt-2'}
        px-[calc(0.5rem+1px)] absolute text-base transition-all cursor-text width-full ${delayedFocus ? 'z-[8]' : 'z-[4]'}
      `} htmlFor={id}>{label}</label>
      <div className={`relative pt-4 pb-1 border border-gray-600 rounded-md w-full bg-white ${delayedFocus ? 'z-[7]' : 'z-[3]'}`}>


        <div className={`relative`}>
          <input className={`w-full outline-none px-2`} 
          value={focus ? query : value || ''} onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => { setFocus(false); }}></input>
          <div className={`absolute flex right-1 top-[calc(50%-8px)]`}>
            { loading && <Loading width={16} height={16} /> }
            { value && <XMarkIcon className={`w-4 h-4`} onClick={() => { setFocus(false); setQuery(''); onChange(''); }} /> }
          </div>
        </div>
        
      </div>
      <div className={`absolute left-0 top-[calc(100%-4px)] ${delayedFocus ? 'z-[6]' : 'z-[2]'} bg-white w-[100%]`}>
        { query == '' ? 
          <p className={`px-2 pt-2 pb-1 rounded-b-lg border border-gray-700 ${!delayedFocus && 'hidden'}`}
          >Type in something to start the suggestions</p> :
          
          loading ?
          <p className={`px-2 pt-2 pb-1 rounded-b-lg border border-gray-700 ${!delayedFocus && 'hidden'}`}>Loading...</p> :
          
          (values.length != 0) ?
          values.map((value, index) => (
            <div key={value} onClick={() => { onChange(value); }} 
            className={`px-2 ${index == 0 && 'pt-2'} pb-1 ${index == values.length-1 && 'rounded-b-lg'} border-x border-b border-gray-700 ${!delayedFocus && 'hidden'}`}>{value}</div>
          )) :
          <p className={`px-2 pt-2 pb-1 rounded-b-lg border border-gray-700 ${!delayedFocus && 'hidden'}`} onClick={() => onChange(query)}>Create "{query}"</p>
        }
      </div>
    </div>
  </>)
}