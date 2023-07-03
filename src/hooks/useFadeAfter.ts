import { useEffect, useState } from "react"

export function useFadeAfter(initialState: boolean, duration: number) {
  const [ openFirst, setOpenFirst ] = useState(initialState);
  const [ open, setOpen ] = useState(initialState);
  const [ opacity, setOpacity ] = useState(initialState ? 1.0 : 0.0);

  useEffect(() => {
    if (openFirst) {
      setOpacity(1.0);
      setOpen(true)
    } else {
      setOpacity(0.0);
      const timer = setTimeout(() => setOpen(false), duration);
      return () => clearTimeout(timer);
    }
  }, [openFirst, duration]);

  return { open, opacity, setOpen: setOpenFirst };
}