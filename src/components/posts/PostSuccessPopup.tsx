import { useImperativeHandle, useState } from "react";
import Popup from "reactjs-popup";

type Props = {
  open: boolean;
  setOpen: CallableFunction
}

export function PostSuccessPopup({open, setOpen}: Props) {
  return (<>
    <Popup modal open={open} onClose={() => setOpen(false)}
      contentStyle={{ width: "33%", height: "35%" , borderRadius: "8px", backgroundColor: 'white', borderStyle: "2px solid" , borderColor: "teal-600"  }}
    >
      <div className='flex flex-col items-center justify-center w-full h-full bg-white border-2 border-solid rounded-md border-x-teal-600 ' >
        <img src='/check-mark-circle-2.svg' alt='check' className='w-32 h-32'></img>
          <span className='text-2xl text-teal-600'>Successful Post</span>
        
      </div>
    </Popup>
  </>)
}