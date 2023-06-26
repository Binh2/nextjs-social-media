import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useCloseAfter(initialState: boolean, duration: number): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [ open, setOpen] = useState(initialState);
  
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      setOpen(false);
    }, duration);
    return () => clearTimeout(timer); 
  }, [open, setOpen, duration]);

  return [
    open,
    setOpen  
  ]
}