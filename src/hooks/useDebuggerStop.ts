import { useEffect } from "react";

function stopDebugger(e: KeyboardEvent) {
  if (e.key == 'F8') debugger;
}
const option = { capture: true }

export function useDebuggerStop() {
  useEffect(() => {
    if (process.env.NODE_ENV != 'development') return;
    document.addEventListener('keydown', stopDebugger, option)
    return () => document.removeEventListener('keydown', stopDebugger, option)
  }, [])
}